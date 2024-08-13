import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import { Outline } from "@/lib/types";
import useContentMutation from "@/hooks/content/useContentMutation";
import useIsMounted from "@/hooks/useIsMounter";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import useClickOutside from "@/hooks/useClickOutside";

export default function OutlineItem({
  outline,
  sessionId,
}: {
  outline: Outline;
  sessionId: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [link, setLink] = useState(outline.url);
  const [value, setValue] = useState(outline.desc);
  const inputRef = useRef<null | HTMLTextAreaElement>(null);
  const containerRef = useRef<null | HTMLElement>(null);
  const { updateMutation, deleteMutation } = useContentMutation(sessionId);

  const handleDelete = () => {
    if (!outline.id) return;
    setIsDeleting(true);
    deleteMutation.mutate(String(outline.id), {
      onError: () => setIsDeleting(false),
    });
  };
  const handleUpdate = useCallback(() => {
    updateMutation.mutate({
      outlineId: String(outline.id),
      data: {
        desc: value,
        url: link,
      },
    });
  }, [updateMutation, outline.id, value, link]);

  const mounted = useIsMounted();

  // Generate unique id for earch outline component (used to identify which outline component we're clicking outside of)
  const id = useMemo(() => `${Math.random().toString().replace(".", "")}`, []);

  // Updates on unmount if any changes happened
  useEffect(() => {
    return () => {
      if (mounted()) return;
      if (value !== outline.desc || link !== outline.url) handleUpdate();
    };
  }, [mounted, value, outline.url, outline.desc, link, handleUpdate]);

  useClickOutside(() => {
    if (inputRef.current && isOpen === true) {
      inputRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsOpen(false);
  }, [`.outline-item-${id}`]);

  return (
    <div className={cn("flex gap-2 group")}>
      <article
        className={cn(
          `flex relative justify-between items-start gap-2  bg-white p-2 pr-4 rounded-md  border-border border-[1px] cursor-pointer  overflow-hidden flex-1 pb-4 transition-all duration-200 outline-item-${id}`
        )}
        ref={containerRef}
        style={{
          height: isOpen ? `10rem` : "3.375rem",
        }}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest(".link-content")) return;
          if ((e.target as HTMLElement).closest(".link-button")) return;
          if ((e.target as HTMLElement).closest(".textarea-content") && isOpen)
            return;
          setIsOpen((cur) => {
            // scroll back to top when we're trying to close.
            if (inputRef.current && cur === true) {
              inputRef.current.scrollTo({ top: 0, behavior: "smooth" });
            }
            return !cur;
          });
        }}
      >
        <Popover>
          <PopoverTrigger asChild className="aspect-square link-button ">
            <Button
              variant={"accent"}
              className={cn(
                "p-0 aspect-square bg-slate-200 [&_i]:text-slate-400 hover:bg-slate-300",
                link && "bg-highlight hover:bg-highlight/90 [&_i]:text-white"
              )}
            >
              <i className="bx bx-link-alt text-white text-xl p-0"></i>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="link-content flex gap-2 p-2 items-center">
            <input
              type="text"
              placeholder="Link here"
              value={link}
              className={cn(
                "py-2 px-4 border-slate-200 border-[1px] rounded-md w-full"
              )}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleUpdate();
              }}
              onChange={(e) => setLink(e.target.value)}
            />
            <Button
              variant={"accent"}
              className={cn(" aspect-square p-0")}
              onClick={handleUpdate}
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? (
                <LoadingSpinner className="stroke-white" />
              ) : (
                <i className="bx bx-check text-2xl text-white"></i>
              )}
            </Button>
          </PopoverContent>
        </Popover>

        <textarea
          className={cn(
            "leading-[220%] text-light mt-[0.25rem] h-full flex-1 resize-none textarea-content break-words px-2 rounded-md cursor-text w-full overflow-y-auto",
            !isOpen && "pointer-events-none cursor-pointer "
          )}
          placeholder="Outline Details Here"
          value={value}
          ref={inputRef}
          onBlur={() => {
            handleUpdate();
          }}
          onChange={(e) => setValue(e.target.value)}
        ></textarea>

        <i
          className={cn(
            "ml-1 bx bx-chevron-down text-2xl duration-300 transition-all ",
            isOpen && "rotate-180"
          )}
        ></i>
      </article>
      <div
        className=" border-border border-[1px] bg-white px-4 rounded-md flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-all duration-200 h-[3.375rem]"
        onClick={() => {
          if (isDeleting) return;
          handleDelete();
        }}
      >
        {isDeleting ? (
          <LoadingSpinner />
        ) : (
          <i className={cn("bx bx-trash text-lg text-light")}></i>
        )}
      </div>{" "}
    </div>
  );
}

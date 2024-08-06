import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
// import { sanitize } from "dompurify";

const CONTENT_PADDING_PX = 20;

export default function OutlineItem() {
  const [isOpen, setIsOpen] = useState(false);
  const [link, setLink] = useState("");
  const [value, setValue] = useState(
    "At vero eos et accusamus et iusto odio dignissimos ducimus quiblanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati "
  );
  const contentRef = useRef<null | HTMLTextAreaElement>(null);
  const containerRef = useRef<null | HTMLElement>(null);

  return (
    <div className={cn("flex gap-2 group w-[30rem]")}>
      <article
        className={cn(
          "flex relative justify-between items-start gap-2  bg-white p-2 pr-4 rounded-md  border-border border-[1px] cursor-pointer  overflow-hidden flex-1 pb-4 transition-all duration-300"
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
          setIsOpen((cur) => !cur);
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
              onChange={(e) => setLink(e.target.value)}
            />
            <Button variant={"accent"} className={cn(" aspect-square")}>
              <i className="bx bx-check text-2xl text-white"></i>
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
          ref={contentRef}
          onChange={(e) => setValue(e.target.value)}
        ></textarea>

        <i
          className={cn(
            "ml-1 bx bx-chevron-down text-2xl duration-500 transition-all ",
            isOpen && "rotate-180"
          )}
        ></i>
      </article>
      <div className=" border-border border-[1px] bg-white px-4 rounded-md flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-all duration-200 h-[3.375rem]">
        <i className={cn("bx bx-trash text-lg text-light")}></i>
      </div>{" "}
    </div>
  );
}

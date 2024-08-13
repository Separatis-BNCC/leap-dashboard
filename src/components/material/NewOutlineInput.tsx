import useContentMutation from "@/hooks/content/useContentMutation";
import { Session } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { LoadingSpinner } from "../ui/LoadingSpinner";

export default function NewOutlineInput({ session }: { session?: Session }) {
  const [desc, setDesc] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const { addMutation } = useContentMutation();

  if (!session)
    return (
      <div className="px-8">
        <div className="bg-bg p-4">
          <Skeleton height={"3rem"} className="w-full" />
        </div>
      </div>
    );

  return (
    <div className="px-8">
      <div className="bg-bg px-4 pb-4 grid grid-cols-[1fr_3rem]">
        <div className="relative w-full h-[3rem]">
          <div
            className="bg-slate-100 aspect-square text-slate-700 rounded-sm flex items-center justify-center absolute z-[30]     top-[0.5rem] bottom-[0.5rem] left-[0.5rem] cursor-pointer hover:bg-slate-50"
            onClick={() => setIsExpanded((cur) => !cur)}
          >
            <i
              className={cn(
                "bx bx-chevron-up text-2xl",
                isExpanded && "rotate-180"
              )}
            ></i>
          </div>

          <textarea
            className={cn(
              "z-[20] resize-none w-full absolute left-0 right-0 bottom-0 border-[1px] border-slate-200 origin-bottom transition-all duration-300 h-[3rem] py-[0.6rem] pl-12 rounded-md pr-10 leading-[200%] text-light overflow-auto",
              isExpanded && "h-[10rem]"
            )}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            onBlur={() => setIsExpanded(false)}
          ></textarea>
        </div>{" "}
        <div
          className={cn(
            "bg-highlight aspect-square text-white rounded-r-sm flex items-center justify-center cursor-pointer hover:bg-highlight/80 transition-all duration-200 ",
            !desc && "bg-slate-300 pointer-events-none"
          )}
          onClick={() => {
            if (!session || !desc || addMutation.isPending) return;
            addMutation.mutate(
              {
                content_type: "link",
                desc,
                url: "test_url",
                session_id: session?.id,
              },
              {
                onSuccess: () => setDesc(""),
              }
            );
          }}
        >
          {addMutation.isPending ? (
            <LoadingSpinner className="stroke-white" />
          ) : (
            <i className={cn("bx bx-send text-lg text-white")}></i>
          )}
        </div>
      </div>
    </div>
  );
}

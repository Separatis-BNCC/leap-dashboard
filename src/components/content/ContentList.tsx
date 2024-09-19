import EmptyOutlines from "./EmptyOutlines";
import { toSorted } from "@/lib/utils";
import ContentItem from "./ContentItem";
import { Session } from "@/lib/types";
import Skeleton from "react-loading-skeleton";
import { HTMLAttributes } from "react";
import { ScrollArea } from "../general/ScrollArea";

type Props = {
  isLoading: boolean;
  sessionData?: Session;
  selectedId?: number;
  setSelectedId: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export default function ContentList({
  isLoading,
  selectedId,
  setSelectedId,
  sessionData,
  ...props
}: Props & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className="p-4 rounded-t-md mt-2 flex-1 min-h-96 border-slate-200 border-[1px] bg-bg"
    >
      <ScrollArea className=" flex flex-col flex-1 h-0 min-h-full relative pr-2">
        {isLoading &&
          new Array(4).fill("x").map((_, i) => {
            return (
              <div className="flex gap-3 w-full mb-4" key={i}>
                <Skeleton containerClassName="flex-1" height={"3rem"} />
                <Skeleton height={"3rem"} width={"4rem"} />
              </div>
            );
          })}
        {sessionData?.contents.length === 0 && !isLoading && <EmptyOutlines />}
        <div className="grid gap-3">
          {sessionData &&
            !isLoading &&
            toSorted(
              sessionData.contents,
              (a, b) => Number(a.id) - Number(b.id)
            ).map((content) => {
              return (
                <ContentItem
                  isSelected={content.id === selectedId}
                  sessionId={sessionData.id}
                  contentItem={content}
                  key={content.id}
                  onClick={() => {
                    setSelectedId((current) =>
                      current === content.id ? undefined : content.id
                    );
                  }}
                />
              );
            })}
        </div>
      </ScrollArea>
    </div>
  );
}

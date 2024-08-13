import { Session } from "@/lib/types";
import Badge from "../general/Badge";
import { ScrollArea } from "../general/ScrollArea";
import OutlineItem from "./OutlineItem";
import { useDialog } from "../general/Dialog";
import useSessionQuery from "@/hooks/session/useSessionQuery";
import EmptyOutlines from "./EmptyOutlines";
import Skeleton from "react-loading-skeleton";
import NewOutlineInput from "./NewOutlineInput";
import { toSorted } from "@/lib/utils";
import ContentEditableInput from "../ui/ContentEditable";
import UseSessionMutation from "@/hooks/session/useSessionMutation";
import { useIsFetching } from "@tanstack/react-query";

export type MaterialDetailContext = {
  session: Session;
};

export default function MaterialDetail() {
  const { contextData, closeDialog } = useDialog<MaterialDetailContext>();
  const { sessionData, sessionQuery } = useSessionQuery({
    id: contextData.session.id,
  });
  const isFetchingSessions = useIsFetching({
    queryKey: ["sessions", contextData.session.id],
  });
  const { updateMutation } = UseSessionMutation();

  return (
    <article className="bg-white [&>*]:px-8 pt-2 pb-4 max-w-[40rem] rounded-md h-[calc(100%-6rem)] flex flex-col">
      <div className="border-b-[1px] border-border pb-2 flex items-center justify-between">
        <p className="font-semibold">Session Details</p>
        <i
          className="bx bx-x text-2xl hover:text-slate-500 hoverable-short"
          onClick={() => closeDialog()}
        ></i>
      </div>
      <div className="mt-4 mb-6">
        <p className="text-light mb-1">Session Title</p>
        <ContentEditableInput
          className="text-2xl font-semibold mb-2"
          value={sessionData?.description}
          skeletonProps={{
            height: "2rem",
          }}
          isLoading={sessionQuery.isLoading}
          isMutating={updateMutation.isPending || Boolean(isFetchingSessions)}
          onMutate={(value, complete) => {
            updateMutation.mutate(
              {
                id: contextData.session.id,
                description: value,
              },
              { onSettled: complete }
            );
          }}
        />
        {/* <h2 className="text-2xl font-semibold mb-2">
          {contextData.session.description}
        </h2> */}
        <Badge variant={"primary"}>Week {contextData.session.week}</Badge>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-light">
          Outline <span className="text-dark ml-1">12</span>
        </p>
        {/* <Button variant={"accent"}>+ Outline</Button> */}
      </div>
      <div className="mt-2 flex-1">
        <ScrollArea className="p-4 border-slate-200 border-[1px] bg-bg rounded-t-md flex flex-col h-0 min-h-full relative">
          {sessionQuery.isLoading &&
            new Array(4).fill("x").map((_, i) => {
              return (
                <div className="flex gap-3 w-full mb-4" key={i}>
                  <Skeleton containerClassName="flex-1" height={"3rem"} />
                  <Skeleton height={"3rem"} width={"4rem"} />
                </div>
              );
            })}
          {sessionData?.contents.length === 0 && <EmptyOutlines />}
          <div className="grid gap-3 w-[32.5rem]">
            {sessionData &&
              toSorted(
                sessionData.contents,
                (a, b) => Number(a.id) - Number(b.id)
              ).map((outline) => {
                return (
                  <OutlineItem
                    sessionId={sessionData.id}
                    outline={outline}
                    key={outline.id}
                  />
                );
              })}
          </div>
        </ScrollArea>
      </div>
      <NewOutlineInput session={sessionData} />
    </article>
  );
}

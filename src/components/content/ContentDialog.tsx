import { Session } from "@/lib/types";
import { useDialog } from "../general/Dialog";
import useSessionQuery from "@/hooks/session/useSessionQuery";
import ContentInput from "./ContentInput";
import { useMemo, useState } from "react";
import OutlineList from "./ContentList";
import OutlineTitle from "./ContentTitle";
import { ScrollArea } from "../general/ScrollArea";

export type ContentDetailContext = {
  session: Session;
};

export default function ContentDailog() {
  const {
    contextData: {
      session: { week, id },
    },
    closeDialog,
  } = useDialog<ContentDetailContext>();
  const [selectedId, setSelectedId] = useState<number | undefined>();
  const { sessionData, sessionQuery } = useSessionQuery({ id });

  const selectedContent = useMemo(() => {
    return sessionData?.contents.find((content) => content.id === selectedId);
  }, [sessionData, selectedId]);

  return (
    <article className="bg-white [&>*]:px-8 pt-2 pb-4 w-full max-w-[50rem] rounded-md h-[calc(100%-6rem)] flex flex-col">
      <div className="border-b-[1px] border-border pb-2 flex items-center justify-between">
        <p className="font-semibold">Session Details</p>
        <i
          className="bx bx-x text-2xl hover:text-slate-500 hoverable-short"
          onClick={() => closeDialog()}
        ></i>
      </div>
      <div className=" overflow-y-auto flex flex-col flex-1">
        <OutlineTitle
          isLoading={sessionQuery.isPending}
          sessionData={sessionData}
          sessionId={id}
          week={week}
        />
        <div className="flex items-center justify-between">
          <p className="text-light">
            Outline{" "}
            <span className="text-dark ml-1">
              {sessionData?.contents.length}
            </span>
          </p>
        </div>
        <OutlineList
          sessionData={sessionData}
          setSelectedId={setSelectedId}
          selectedId={selectedId}
          isLoading={sessionQuery.isPending}
        />
        <ContentInput
          sessionId={sessionData?.id}
          content={selectedContent}
          // Causes selection to be removed on success
          onSuccessfulMutation={() => setSelectedId(undefined)}
        />{" "}
      </div>
    </article>
  );
}

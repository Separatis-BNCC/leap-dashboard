import { useState } from "react";
import { Checkbox } from "../general/Checkbox";
import { cn, toSorted } from "@/lib/utils";
import useTableSelect from "@/hooks/table/useTableSelect";
import { Session } from "@/lib/types";
import Table from "../general/Table";
import { useDialog } from "../general/Dialog";
import { Button } from "../ui/Button";

type Props = {
  sessions?: Session[];
  courseId?: number;
};

const ROW_HEIGHT_PX = 55;

export default function SessionTable({ sessions, courseId }: Props) {
  const {
    handleSelect,
    handleSelectAll,
    showPopup,
    allSelected,
    selectedData,
    handleReset,
  } = useTableSelect({
    data: sessions,
  });
  const { showDialog } = useDialog();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      <Table.Container
        isLoading={!sessions}
        className="bg-white pb-6"
        gridTemplateColumns="2rem 6rem minmax(12rem, 1fr) 12rem 2rem"
      >
        <Table.Head>
          <Checkbox onClick={handleSelectAll} checked={allSelected} />
          <h2>Session</h2>
          <h2>Description</h2>
          <h2>Outlines</h2>
          <i className="bx bx-edit-alt invisible"></i>
        </Table.Head>

        <div
          className="transition-all duration-500 min-h-[17.5rem]"
          style={{
            maxHeight:
              isExpanded && sessions
                ? `${sessions.length * ROW_HEIGHT_PX}px`
                : "17.5rem",
          }}
        >
          <Table.Content>
            {sessions && sessions.length === 0 && (
              <div className="h-[17.5rem] flex items-center justify-center flex-col  rounded-md">
                <h2 className="text-2xl text-dark font-semibold mb-1">
                  No Sessions Found
                </h2>
                <p className="text-light mb-5">
                  Looks like you haven't added any sessions yet
                </p>
                <Button
                  variant={"accent"}
                  className="py-5 px-7"
                  onClick={() => showDialog("add-session", courseId)}
                >
                  Add Session +
                </Button>
              </div>
            )}
            {sessions &&
              toSorted(sessions, (a, b) => a.week - b.week).map((session) => {
                const isSelected = selectedData.some(
                  (item) => item.id === session.id
                );
                return (
                  <Table.Row
                    onSelect={handleSelect(session)}
                    className={cn(
                      isSelected
                        ? "bg-bg/50 [&>p]:text-highlight [&>i]:text-highlight"
                        : "hover:bg-bg/20"
                    )}
                  >
                    <Checkbox checked={isSelected} />
                    <p>
                      {session.week > 9 ? session.week : `0${session.week + 1}`}
                    </p>
                    <p className="truncate">{session.description}</p>
                    <p className="truncate">{session.outlineCount || 0}</p>
                    <i
                      className="bx bx-edit-alt text-lg edit-session-button hover:text-highlight transition-all duration-200 cursor-pointer"
                      onClick={() => showDialog("edit-session", session)}
                    ></i>
                  </Table.Row>
                );
              })}
          </Table.Content>
        </div>
      </Table.Container>

      {sessions && sessions.length >= 6 && (
        <i
          className={cn(
            "absolute left-[50%] translate-x-[-50%] bottom-[0.375rem] bx bx-chevron-down text-2xl text-highlight  cursor-pointer group-hover:opacity-70 transition-all duration-100 flex items-center justify-center ",
            isExpanded && "rotate-180",
            selectedData.length > 0 && "translate-y-[-0.125rem]"
          )}
          onClick={() => {
            setIsExpanded((cur) => !cur);
          }}
        ></i>
      )}
      <div
        className={cn(
          "bg-highlight text-white w-fit items-center justify-center px-4 py-3 flex rounded-md left-[50%] translate-x-[-50%] absolute bottom-[-2.5rem] translate-y-[0.5rem] opacity-0 transition-all duration-200",
          selectedData.length > 0 &&
            showPopup &&
            "opacity-100 translate-y-[0rem]"
        )}
      >
        <div className="flex items-center justify-center gap-2 border-r-[2px] border-white pr-4">
          <i
            className="bx bx-x text-xl text-white cursor-pointer hover:opacity-50 transition-all duration-100"
            onClick={handleReset}
          ></i>
          <p className="text-white whitespace-nowrap">
            {selectedData.length} Session Selected
          </p>
        </div>
        <div className="ml-4 flex items-center gap-2 justify-center">
          <i className="bx bxs-trash-alt text-lg text-white cursor-pointer hover:opacity-50 transition-all duration-100"></i>
          <p className="text-white whitespace-nowrap">Delete</p>
        </div>
      </div>
    </div>
  );
}

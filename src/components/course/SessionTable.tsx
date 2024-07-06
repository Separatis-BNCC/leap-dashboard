import { useState } from "react";
import { Checkbox } from "../general/Checkbox";
import { ScrollArea, ScrollBar } from "../general/ScrollArea";
import { cn } from "@/lib/utils";
import SessionTableContent from "./SessionTableContent";
import useTableSelect from "@/hooks/table/useTableSelect";
import { Session } from "@/lib/types";

type Props = {
  sessions: Session[];
};

export default function SessionTable({ sessions }: Props) {
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

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      <ScrollArea className="rounded-md">
        <ul className="grid bg-white pt-8 pb-14 min-w-[40rem]">
          <li className="grid grid-cols-[1fr_5fr_20fr_5fr_auto] gap-x-3 mb-4 pl-8 pr-16">
            <Checkbox onClick={handleSelectAll} checked={allSelected} />
            <h2>Session</h2>
            <h2>Title</h2>
            <h2>Outlines</h2>
            <i className="bx bx-edit-alt invisible"></i>
          </li>
          <SessionTableContent
            handleSelect={handleSelect}
            isExpanded={isExpanded}
            selectedData={selectedData}
            sessions={sessions}
          />
        </ul>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>{" "}
      <i
        className={cn(
          "bx bx-chevron-down absolute text-2xl text-highlight left-[50%] translate-x-[-50%] bottom-[0.875rem] cursor-pointer hover:opacity-70 transition-all duration-100",
          isExpanded && "rotate-180",
          selectedData.length > 0 && "translate-y-[-0.125rem]"
        )}
        onClick={() => setIsExpanded((cur) => !cur)}
      ></i>
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

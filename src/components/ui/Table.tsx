import { MouseEvent, useState } from "react";
import { Checkbox } from "../general/Checkbox";
import { ScrollArea, ScrollBar } from "../general/ScrollArea";
import { cn } from "@/lib/utils";

type Props<T> = { data: T[] };

export default function Table<T>({ data }: Props<T>) {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const allSelected = selectedIndexes.length === data.length;

  const handleSelectAll = () => {
    setShowPopup(!allSelected);
    setSelectedIndexes(
      allSelected ? [] : new Array(data.length).fill("").map((_, i) => i)
    );
  };

  const handleSelect = (itemIndex: number) => (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest(".edit-session-button")) return;

    const isSelected = selectedIndexes.includes(itemIndex);
    const newSelected = isSelected
      ? selectedIndexes.filter((item) => item !== itemIndex)
      : [...selectedIndexes, itemIndex];

    if (!isSelected) setShowPopup(true);

    setSelectedIndexes(newSelected);
  };

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
          {/* <SessionTableContent
            handleSelect={handleSelect}
            isExpanded={isExpanded}
            selectedIndexes={selectedIndexes}
            sessions={sessions}
          /> */}
        </ul>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>{" "}
      <i
        className={cn(
          "bx bx-chevron-down absolute text-2xl text-highlight left-[50%] translate-x-[-50%] bottom-[0.875rem] cursor-pointer hover:opacity-70 transition-all duration-100",
          isExpanded && "rotate-180",
          selectedIndexes.length > 0 && "translate-y-[-0.125rem]"
        )}
        onClick={() => setIsExpanded((cur) => !cur)}
      ></i>
      <div
        className={cn(
          "bg-highlight text-white w-fit items-center justify-center px-4 py-3 flex rounded-md left-[50%] translate-x-[-50%] absolute bottom-[-2.5rem] translate-y-[0.5rem] opacity-0 transition-all duration-200",
          selectedIndexes.length > 0 &&
            showPopup &&
            "opacity-100 translate-y-[0rem]"
        )}
      >
        <div className="flex items-center justify-center gap-2 border-r-[2px] border-white pr-4">
          <i
            className="bx bx-x text-xl text-white cursor-pointer hover:opacity-50 transition-all duration-100"
            onClick={() => {
              setShowPopup(false);
              setSelectedIndexes([]);
            }}
          ></i>
          <p className="text-white whitespace-nowrap">
            {selectedIndexes.length} Session Selected
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

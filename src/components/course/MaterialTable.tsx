import { useState } from "react";
import { Checkbox } from "../general/Checkbox";
import { ScrollArea, ScrollBar } from "../general/ScrollArea";
import { cn } from "@/lib/utils";

type Props = { materials: { title: string; outlineCount: number }[] };

export default function MaterialTable({ materials }: Props) {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const allSelected = selectedIndexes.length === materials.length;

  const handleSelectAll = () => {
    setShowPopup(!allSelected);
    setSelectedIndexes(
      allSelected ? [] : new Array(materials.length).fill("").map((_, i) => i)
    );
  };

  return (
    <div className="relative">
      <ScrollArea className="rounded-md">
        <ul className="grid bg-white pt-6 pb-8 min-w-[40rem]">
          <li className="grid grid-cols-[1fr_5fr_20fr_5fr_auto] gap-x-3 mb-4 px-8">
            <Checkbox onClick={handleSelectAll} checked={allSelected} />
            <h2>Session</h2>
            <h2>Title</h2>
            <h2>Outlines</h2>
            <i className="bx bx-edit-alt invisible"></i>
          </li>
          <ScrollArea className="max-h-[15.25rem]">
            <div>
              {materials.map((material, i) => {
                const isSelected = selectedIndexes.includes(i);
                return (
                  <li
                    onClick={() => {
                      const newSelected = isSelected
                        ? selectedIndexes.filter((item) => item !== i)
                        : [...selectedIndexes, i];

                      if (!isSelected) setShowPopup(true);

                      setSelectedIndexes(newSelected);
                    }}
                    className={cn(
                      "grid grid-cols-[1fr_5fr_20fr_5fr_auto] gap-x-3 px-8 py-5 transition-all duration-100 cursor-pointer",
                      isSelected
                        ? "bg-bg/50 [&>p]:text-highlight [&>i]:text-highlight"
                        : "hover:bg-bg/20"
                    )}
                    key={material.title}
                  >
                    <Checkbox checked={isSelected} />
                    <p>{i + 1 > 9 ? i : `0${i + 1}`}</p>
                    <p className="truncate">{material.title}</p>
                    <p className="truncate">{material.outlineCount}</p>
                    <i className="bx bx-edit-alt"></i>
                  </li>
                );
              })}
            </div>
          </ScrollArea>
        </ul>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>{" "}
      <div
        className={cn(
          "bg-highlight text-white w-fit items-center justify-center px-4 py-3 flex rounded-md left-[50%] translate-x-[-50%] absolute bottom-[-1.875rem] translate-y-[0.5rem] opacity-0 transition-all duration-200",
          selectedIndexes.length > 0 &&
            showPopup &&
            "opacity-100 translate-y-[0rem]"
        )}
      >
        <div className="flex items-center justify-center gap-2 border-r-[2px] border-white pr-4">
          <i
            className="bx bx-x text-xl text-white cursor-pointer hover:opacity-50 transition-all duration-100"
            onClick={() => setShowPopup(false)}
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

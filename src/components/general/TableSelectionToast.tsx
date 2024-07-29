import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  selectedData: unknown[];
  showPopup: boolean;
  handleReset: () => void;
  children: ReactNode;
};

export default function TableSelectionToast({
  showPopup,
  selectedData,
  handleReset,
  children,
}: Props) {
  return (
    <div
      className={cn(
        "bg-highlight text-white w-fit items-center justify-center px-4 py-3 flex rounded-md left-[50%] translate-x-[-50%] absolute bottom-[-2.5rem] translate-y-[-2.25rem] opacity-0 transition-all duration-200",
        selectedData.length > 0 &&
          showPopup &&
          "opacity-100 translate-y-[-2.5rem]"
      )}
    >
      <div className="flex items-center justify-center gap-2 border-r-[2px] border-white pr-4">
        <i
          className="bx bx-x text-xl text-white cursor-pointer hover:opacity-50 transition-all duration-100"
          onClick={handleReset}
        ></i>
        <p className="text-white whitespace-nowrap">
          {selectedData.length} Selected
        </p>
      </div>
      {children}
    </div>
  );
}

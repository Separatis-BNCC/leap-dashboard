import { cn } from "@/lib/utils";
import { ScrollArea } from "../general/ScrollArea";
import { Checkbox } from "../general/Checkbox";
import { useDialog } from "../general/Dialog";

type Props = {
  sessions: { title: string; outlineCount: number }[];
  isExpanded: boolean;
  selectedIndexes: number[];
  handleSelect: (itemIndex: number) => () => void;
};
const ROW_HEIGHT_PX = 55;

export default function SessionTableContent({
  sessions,
  isExpanded,
  selectedIndexes,
  handleSelect,
}: Props) {
  const { showDialog } = useDialog();

  return (
    <ScrollArea
      className={cn(" transition-all duration-500")}
      // max height gabisa animate ke 100%
      style={{
        maxHeight: isExpanded
          ? `${sessions.length * ROW_HEIGHT_PX}px`
          : "17.25rem",
      }}
    >
      <div className="">
        {sessions.map((session, i) => {
          const isSelected = selectedIndexes.includes(i);
          return (
            <li
              onClick={handleSelect(i)}
              className={cn(
                "grid grid-cols-[1fr_5fr_20fr_5fr_auto] gap-x-3 pl-8 pr-16 py-5 transition-all duration-100 cursor-pointer items-center",
                isSelected
                  ? "bg-bg/50 [&>p]:text-highlight [&>i]:text-highlight"
                  : "hover:bg-bg/20"
              )}
              key={`${session.title}${i}`}
            >
              <Checkbox checked={isSelected} />
              <p>{i + 1 > 9 ? i : `0${i + 1}`}</p>
              <p className="truncate">{session.title}</p>
              <p className="truncate">{session.outlineCount}</p>
              <i
                className="bx bx-edit-alt text-lg edit-session-button hover:text-highlight transition-all duration-200 cursor-pointer"
                onClick={() => showDialog("edit-session", session)}
              ></i>
            </li>
          );
        })}
      </div>
    </ScrollArea>
  );
}

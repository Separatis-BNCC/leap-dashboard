import { cn } from "@/lib/utils";
import { ScrollArea } from "../general/ScrollArea";

export default function AgendaSchedule() {
  return (
    <div className="flex flex-col items-center gap-2 ">
      <p className="text-light mr-2 mb-2">Upcoming Today</p>
      <div className="flex-1 relative w-full overflow-hidden">
        <ScrollArea className="h-0 min-h-full">
          <ul className="w-full pr-2">
            {new Array(10).fill("x").map((_, i) => {
              const isActive = i === 0;

              return (
                <li
                  key={i}
                  className={cn(
                    "flex justify-between  py-2 px-4 rounded-md",
                    isActive &&
                      "bg-gradient-to-l from-highlight-dark to-highlight [&_*]:text-white rounded-md"
                  )}
                >
                  <p>FE-C</p>
                  <p>17.20</p>
                </li>
              );
            })}
          </ul>
        </ScrollArea>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/Popover";
import { cn, days } from "@/lib/utils";
import { ScrollArea } from "./ScrollArea";

type Day = (typeof days)[number];

export default function DayPicker(props: {
  placeholder?: string;
  onSelect?: (value: Day, dayAsNumber: number) => void;
  value?: Day;
  className?: string;
}) {
  const [selected, setSelected] = useState<Day | undefined>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSelected(props.value);
  }, [props.value]);

  return (
    <Popover onOpenChange={setIsOpen} open={isOpen}>
      <PopoverTrigger
        className={cn(
          "py-2 px-4 border-border border rounded-md min-w-72 w-full flex justify-between items-center hover:bg-bg/50 transition-all duration-100 cursor-pointer",
          props.className
        )}
      >
        {selected || props.placeholder ? (
          <p>{selected || props.placeholder}</p>
        ) : (
          <p className="text-light">Choose Day</p>
        )}
        <i className="bx bx-chevron-down text-xl"></i>
      </PopoverTrigger>
      <PopoverContent align="start" className="grid px-2 py-2">
        <ScrollArea className="[&>div]:max-h-[10rem]">
          {days.map((day) => {
            return (
              <p
                className={cn(
                  "text-light px-4 py-2 hover:bg-bg/50 transition-all duration-100 cursor-pointer",
                  day === selected && "bg-bg rounded-sm text-dark"
                )}
                key={day}
                onClick={() => {
                  setSelected(day === selected ? undefined : day);
                  setIsOpen(false);
                  if (props.onSelect) props.onSelect(day, days.indexOf(day));
                }}
              >
                {day}
              </p>
            );
          })}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}

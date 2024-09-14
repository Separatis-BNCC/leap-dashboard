import { useState } from "react";
import { Calendar } from "./Calendar";
import { cn, formatDate } from "@/lib/utils";
import useClickOutside from "@/hooks/useClickOutside";

type Props = {
  label?: string;
  className?: string;
};

export default function DatePicker({ label, className }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [formattedDate, setFormattedDate] = useState("Select Date");

  useClickOutside(() => {
    setIsOpen(false);
  }, [".calendar-datepicker"]);

  return (
    <div className={cn("relative", className)}>
      <p className="text-dark mb-2">{label}</p>
      <div
        className="flex items-center border-[1px] border-border rounded-md px-6 py-3 justify-between relative group"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <p className="text-light">{formattedDate}</p>
        <i className="bx bx-calendar text-xl text-light group-hover:opacity-75 duration-200 transition-all cursor-pointer calendar-datepicker"></i>
      </div>
      <div
        className={cn(
          "absolute  right-[-2px] top-[0.25rem] bg-white border-[1px] border-bg rounded-md transition-all duration-200 translate-y-[4.5rem] opacity-0 invisible shadow-md scale-[97.5%]",
          isOpen && "visible opacity-100 translate-y-[5rem] scale-[100%]"
        )}
      >
        <Calendar
          className="calendar-datepicker"
          mode="single"
          selected={new Date(formattedDate)}
          disableTodayHighlight
          onSelect={(value) => {
            setFormattedDate(value ? formatDate(value) : "Select Date");
          }}
          initialFocus
        />
      </div>
    </div>
  );
}

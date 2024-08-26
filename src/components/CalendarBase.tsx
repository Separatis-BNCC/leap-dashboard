import { cn } from "@/lib/utils";
import { useMemo, useRef, useState } from "react";

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function Calendar() {
  const [date, setDate] = useState(new Date());
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();

  const startDate = new Date(currentYear, currentMonth, 1);
  const startDateDay = startDate.getDay();

  const endDate = new Date(currentYear, currentMonth + 1, 0);

  const prevDate = new Date(date.getFullYear(), date.getMonth(), 0);
  const prevMonthDate = prevDate.getDate();

  const nextDate = new Date(currentYear, currentMonth + 1, 1);
  const nextMonthDay = nextDate.getDay();

  return (
    <div className="h-72">
      <div className="grid grid-cols-2 mb-4 ">
        <button
          className="hover:opacity-50 cursor-pointer"
          onClick={() => {
            setDate((current) => {
              return new Date(current.getFullYear(), current.getMonth(), 0);
            });
          }}
        >
          Prev
        </button>
        <button
          onClick={() => {
            setDate((current) => {
              return new Date(current.getFullYear(), current.getMonth() + 2, 0);
            });
          }}
          className="hover:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
      <p className="mb-2">
        Year : {date.getFullYear()}/{date.getMonth() + 1}
      </p>
      <div className="grid grid-cols-7 gap-4">
        {new Array(startDateDay).fill("x").map((_, i) => {
          const idx = startDateDay - i;
          return (
            <div className="text-lighter" key={`start${i}`}>
              {prevMonthDate - idx + 1}
            </div>
          );
        })}
        {new Array(endDate.getDate()).fill("x").map((_, i) => {
          return (
            <div key={i} className={cn("")}>
              {i + 1}
            </div>
          );
        })}
        {nextMonthDay !== 0 &&
          new Array(7 - nextMonthDay).fill("x").map((_, i) => {
            return (
              <div className="text-lighter" key={`end${i}`}>
                {i + 1}
              </div>
            );
          })}
      </div>
    </div>
  );
}

import Calendar from "@/components/Calendar";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const formatMonthYear = (date: Date): string => {
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
};

export const getDayOfYear = (date: Date): number => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return dayOfYear;
};

const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// shadow-[0_0_0.25rem_0.1rem_rgba(0,0,0,0.05)]
export default function ClassCalendar() {
  const highlights = [new Date(), new Date("9-09-2024")];
  return (
    <div className=" rounded-md">
      <Calendar.Container className="border border-border   bg-white p-4 rounded-md">
        <div className="gap-2 grid grid-cols-[auto_1fr_auto] place-items-center mb-4">
          <Calendar.Navigator
            type="prev"
            className="p-1 border border-border rounded-md flex items-center justify-center cursor-pointer hover:bg-slate-100 transition-all duration-100"
          >
            <i className="bx bx-chevron-left text-xl leading-[100%]"></i>
          </Calendar.Navigator>
          <Calendar.Title
            render={(date) => {
              return <div>{formatMonthYear(date)}</div>;
            }}
          ></Calendar.Title>
          <Calendar.Navigator
            type="next"
            className="p-1 border border-border rounded-md flex items-center justify-center cursor-pointer hover:bg-slate-100 transition-all duration-100"
          >
            <i className="bx bx-chevron-right  text-xl leading-[100%]"></i>
          </Calendar.Navigator>
        </div>
        <div className="grid grid-cols-7 mb-2 ">
          {days.map((day) => {
            return (
              <div
                key={day}
                className="text-light p-1 flex items-center justify-center"
              >
                {day}
              </div>
            );
          })}
        </div>
        <Calendar.Body
          className="place-items-center gap-1"
          render={({ value, date }) => {
            const isHighlighted = highlights.find(
              (item) => getDayOfYear(date) === getDayOfYear(item)
            );
            return (
              <div
                className={cn(
                  "w-9 h-9 flex items-center text-dark justify-center rounded-sm ",
                  isHighlighted &&
                    "bg-dark text-white hover:bg-dark/70 cursor-pointer transition-all duration-200"
                )}
              >
                {value}
              </div>
            );
          }}
          renderRemainder={({ value }) => {
            return (
              <div className="w-9 h-9 flex   items-center justify-center text-border">
                {value}
              </div>
            );
          }}
        />
      </Calendar.Container>
    </div>
  );
}

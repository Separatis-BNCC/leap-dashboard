import Calendar from "@/components/Calendar";
import Badge from "@/components/general/Badge";
import { ClassScheduler } from "@/lib/scheduling";
import { Classes } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

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

export default function ClassCalendar({
  classData,
  scheduler,
}: {
  classData?: Classes;
  scheduler?: ClassScheduler;
}) {
  const schedules = useMemo(() => {
    if (!classData || !scheduler) return undefined;

    const scheduleWithSessionData = [];
    const allSchedules = scheduler.all();
    const sessions = classData.sessions;

    // Ensures the session will be always sorted.
    sessions.sort((a, b) => a.week - b.week);

    // Merge the session and schedule objects into an array.
    for (let i = 0; i < sessions.length; i++) {
      scheduleWithSessionData[i] = { ...sessions[i], ...allSchedules[i] };
    }

    return scheduleWithSessionData;
  }, [classData, scheduler]);
  const today = new Date();

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
            const schedule = schedules?.find(
              (item) => getDayOfYear(date) === getDayOfYear(item.date)
            );

            const isToday = getDayOfYear(today) === getDayOfYear(date);
            return (
              <div
                className={cn(
                  "group w-9 h-9 flex items-center relative text-dark justify-center rounded-sm ",
                  schedule &&
                    "bg-dark text-white hover:bg-dark/70 cursor-pointer transition-all duration-200",
                  schedule?.completed && "bg-bg hover:bg-border text-dark",
                  isToday && "bg-highlight text-white"
                )}
              >
                {value}
                {schedule && (
                  <div className="w-fit left-12 absolute top-0 z-10 bg-white p-4 rounded-md border border-border shadow-[0_0_0.25rem_0.125rem_rgba(0,0,0,0.025)] invisible opacity-0 transition-all duration-100 group-hover:visible group-hover:opacity-100">
                    <p className="text-light">Session {schedule?.week}</p>
                    <h2 className="whitespace-nowrap mb-3 text-md">
                      {schedule?.description}
                    </h2>
                    <Badge variant={schedule?.completed ? "gray" : "primary"}>
                      {schedule?.completed ? "Completed" : "Upcoming"}
                    </Badge>
                  </div>
                )}
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

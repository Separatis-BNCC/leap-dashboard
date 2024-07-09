import { useMemo, useState } from "react";
import { Calendar } from "../ui/Calendar";
import ClassSessionDetail from "./ClassSessionDetail";

type Props = {
  schedules: Date[];
};

export default function ClassSchedule({ schedules }: Props) {
  const [selectedDate, setSelectedDate] = useState(schedules[0]);

  const scheduleTimestamps = useMemo(
    () => schedules.map((schedule) => schedule.getTime()),
    [schedules]
  );

  return (
    <div className="grid grid-cols-[auto_1fr] gap-6 mt-6">
      <Calendar
        className="bg-white w-fit"
        modifiers={{
          schedules,
          selected: selectedDate,
        }}
        modifiersClassNames={{
          schedules:
            "after:content-[''] after:absolute relative after:bg-highlight after:w-1 after:h-1 after:rounded-full after:bottom-[0px]",
          selected:
            "bg-highlight text-white hover:bg-highlight/80 hover:text-white",
        }}
        onDayClick={(date) => {
          const timestamp = date.getTime();
          if (!scheduleTimestamps.includes(timestamp)) return;
          setSelectedDate(date);
        }}
      />
      <ClassSessionDetail />
    </div>
  );
}

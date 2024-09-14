import { Button } from "@/components/ui/Button";
import ClassSchedulePicker from "./ClassSchedulePicker";
import { useMemo } from "react";
import { Classes } from "@/lib/types";
import { days } from "@/lib/utils";
import Skeleton from "react-loading-skeleton";

function formatTime(hour?: number, minute?: number) {
  if (typeof hour === "number" && typeof minute === "number") {
    return `${hour <= 9 ? `0${hour}` : `${hour}`}:${
      minute <= 9 ? `0${minute}` : `${minute}`
    }`;
  }
  return undefined;
}

type Props = {
  classData?: Classes;
  isLoading: boolean;
};

export default function ClassSchedule({ classData, isLoading }: Props) {
  const schedule = useMemo(() => {
    const time = formatTime(classData?.hour, classData?.minute);
    const day = classData?.day_of_week;
    if (!time || !day) return undefined;
    return `${days[day]}, ${time}`;
  }, [classData?.hour, classData?.minute, classData?.day_of_week]);

  return (
    <div className="bg-white rounded-md p-5 border-border border">
      <div className="flex gap-2 items-center">
        <i className="bx bx-time-five text-lg text-light"></i>
        <p className="text-light">Schedule</p>
      </div>
      <div className="flex justify-between">
        {isLoading ? (
          <Skeleton height={"2rem"} width={"12.5rem"} />
        ) : (
          <h2 className="text-2xl font-semibold mt-1">
            {schedule || "No Schedule Set"}
          </h2>
        )}

        <ClassSchedulePicker
          classData={classData}
          triggerElement={
            <Button disabled={isLoading} variant={"accent"}>
              Set Schedule
            </Button>
          }
        />
      </div>
      <div className="w-full h-[1px] bg-border mt-3 mb-4"></div>
      <p className="text-light">No Upcoming Classes</p>
    </div>
  );
}

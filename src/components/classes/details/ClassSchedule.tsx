import { Button } from "@/components/ui/Button";
import ClassSchedulePicker from "./ClassSchedulePicker";
import { useMemo } from "react";
import { Classes } from "@/lib/types";
import { days, formatDate } from "@/lib/utils";
import Skeleton from "react-loading-skeleton";
import { ClassScheduler } from "@/lib/scheduling";
import Badge from "@/components/general/Badge";

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
  scheduler?: ClassScheduler;
};

export default function ClassSchedule({
  classData,
  isLoading,
  scheduler,
}: Props) {
  const schedule = useMemo(() => {
    const time = formatTime(classData?.hour, classData?.minute);
    const day = classData?.day_of_week;
    if (!time || typeof day !== "number") return undefined;
    return `${days[day]}, ${time}`;
  }, [classData?.hour, classData?.minute, classData?.day_of_week]);

  const upcomingClass = useMemo(() => {
    if (!scheduler) return undefined;
    return formatDate(scheduler.upcoming());
  }, [scheduler]);

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
      {isLoading ? (
        <Skeleton />
      ) : upcomingClass ? (
        <div className="flex gap-2 items-center">
          <Badge variant={"primary"}>Upcoming</Badge>
          <p className="text-light">{upcomingClass}</p>
        </div>
      ) : (
        <p>No Upcoming Classes</p>
      )}
    </div>
  );
}

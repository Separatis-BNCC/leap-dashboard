import { Classes } from "@/lib/types";
import { getDay } from "@/lib/utils";
import Skeleton from "react-loading-skeleton";

function formatTime(hour?: number, minute?: number) {
  if (typeof hour === "number" && typeof minute === "number") {
    return `${hour <= 9 ? `0${hour}` : `${hour}`}:${
      minute <= 9 ? `0${minute}` : `${minute}`
    }`;
  }
  return undefined;
}

export default function ClassTime({ classData }: { classData?: Classes }) {
  if (!classData) return <Skeleton height={"3rem"} className="!w-[17.5rem]" />;

  // Schedule exists
  if (classData.day_of_week && classData.hour) {
    return (
      <div className="flex flex-wrap gap-x-4">
        <h1 className="text-4xl text-dark mb-3">
          {getDay(classData.day_of_week)},{" "}
        </h1>
        <p className="text-4xl  text-dark ">
          {formatTime(classData.hour, classData.minute)}
        </p>
      </div>
    );
  }

  return <h1 className="text-4xl text-dark">No Schedule</h1>;
}

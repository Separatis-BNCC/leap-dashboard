import ClassMemberTable from "@/components/classes/ClassMemberTable";
import ClassSchedule from "@/components/classes/ClassSchedule";
import useClassQuery from "@/hooks/class/useClassQuery";
import { calculateSchedule } from "@/lib/class-scheduler";
import { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import { Navigate, useParams } from "react-router-dom";

const day_of_week = "thursday";
const start_date = new Date("06-27-2024");
const meeting_count = 15;

export default function Classes() {
  const params = useParams();
  const classId = params.classId;
  const { classData } = useClassQuery({ classId: Number(classId) });

  const schedules = useMemo(
    () =>
      calculateSchedule({
        dayOfWeek: day_of_week,
        startDate: start_date,
        meetingCount: meeting_count,
      }),
    []
  );

  if (!classId) return <Navigate to={"/dashboard"} />;

  return (
    <div className="p-8 flex flex-1 flex-col">
      <p className="mb-1">Class</p>
      <div className="text-dark font-semibold text-3xl">
        {classData?.name || (
          <Skeleton height={"100%"} className="text-3xl" width={"8rem"} />
        )}
      </div>
      <h1 className="bg-red-300 "></h1>
      <ClassSchedule schedules={schedules} />
      <ClassMemberTable />
    </div>
  );
}

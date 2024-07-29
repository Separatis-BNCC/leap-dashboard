import { AssignMemberContext } from "@/components/classes/AssignMember";
import ClassMemberTable from "@/components/classes/ClassMemberTable";
import ClassSchedule from "@/components/classes/ClassSchedule";
import ClassUpcomingSession from "@/components/classes/ClassUpcomingSession";
import { useDialog } from "@/components/general/Dialog";
import { Button } from "@/components/ui/Button";
import SearchInput from "@/components/ui/SearchInput";
import useClassQuery from "@/hooks/class/useClassQuery";
import { calculateSchedule } from "@/lib/class-scheduler";
import { useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Navigate, useParams } from "react-router-dom";
import ClassDetailsCard from "../ClassDetailsCard";

const day_of_week = "thursday";
const start_date = new Date("06-27-2024");
const meeting_count = 15;

export default function ClassDetails() {
  const params = useParams();
  const [isShowingDetails, setIsShowingDetails] = useState(true);
  const { showDialog } = useDialog();
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
    <div className="flex flex-1 flex-col mt-2">
      <div></div>
      {isShowingDetails ? (
        <div className="grid grid-cols-[9fr_4fr] mt-4 gap-6">
          <ClassDetailsCard classId={classId} />
          <ClassUpcomingSession />
        </div>
      ) : (
        <ClassSchedule schedules={schedules} />
      )}
      <div className="mt-6 flex-1 justify-center mb-4 flex-col flex">
        <div className="flex mb-4 items-center">
          <p className="flex-1 text-xl h-fit">
            All Users <span className="ml-2 text-xl text-slate-500">100</span>
          </p>
          <SearchInput />
          <Button
            variant={"accent"}
            className="ml-4"
            onClick={() =>
              showDialog("assign-member", {
                classId: +classId,
                members: classData?.members,
              } satisfies AssignMemberContext)
            }
          >
            Manage Members
          </Button>
        </div>
        <ClassMemberTable members={classData?.members} />
      </div>
    </div>
  );
}

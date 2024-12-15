import { AssignMemberContext } from "@/components/classes/AssignMember";
import ClassMemberTable from "@/components/classes/ClassMemberTable";
import { useDialog } from "@/components/general/Dialog";
import { Button } from "@/components/ui/Button";
import SearchInput from "@/components/ui/SearchInput";
import { Navigate, useOutletContext, useParams } from "react-router-dom";
import { ClassContext } from "@/pages/ClassLayout";
import ClassCalendar from "./ClassCalendar";
import ClassSchedule from "./ClassSchedule";
import ClassPraetorian from "./ClassPraetorian";
import ClassMisc from "./ClassMisc";
import { useMemo } from "react";
import { ClassScheduler } from "@/lib/scheduling";

export default function ClassDetails() {
  const { showDialog } = useDialog();
  const { classData, isFetchingClassData } = useOutletContext<ClassContext>();
  const { classId } = useParams();

  // Creates a scheduler object that contains logic for figuring which date should the classes be based on the given schedule data.
  const scheduler = useMemo(() => {
    if (
      !classData ||
      !classData.hour ||
      !classData.day_of_week ||
      !classData.minute
    )
      return undefined;
    return new ClassScheduler({
      day: classData.day_of_week,
      hour: classData.hour,
      minute: classData.minute,
      // NANTI INI DIGANTI SAMA START DATE BENERANNYA (TODO)
      startDate: new Date("09-1-2024"),
      sessionCount: classData.sessions.length,
    });
  }, [classData]);

  if (!classId) return <Navigate to={"/dashboard"} />;

  return (
    <div className="flex flex-1 flex-col mt-2">
      <div className="grid grid-cols-[auto_1fr_1fr] gap-4">
        <ClassCalendar classData={classData} scheduler={scheduler} />
        <div className="flex flex-col gap-4 ">
          <ClassSchedule
            classData={classData}
            isLoading={isFetchingClassData}
            scheduler={scheduler}
          />
          <ClassPraetorian />
        </div>
        <ClassMisc />
      </div>

      <ClassMemberTable />
    </div>
  );
}

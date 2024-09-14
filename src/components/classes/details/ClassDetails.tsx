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

export default function ClassDetails() {
  const { showDialog } = useDialog();
  const { classData, isFetchingClassData } = useOutletContext<ClassContext>();
  const { classId } = useParams();

  if (!classId) return <Navigate to={"/dashboard"} />;

  const handleOpenAssignMemberModal = () => {
    showDialog("assign-member", {
      classId: +classId,
      members: classData?.members,
    } satisfies AssignMemberContext);
  };

  return (
    <div className="flex flex-1 flex-col mt-2">
      <div className="grid grid-cols-[auto_3fr_2fr] gap-4">
        <ClassCalendar />
        <div className="flex flex-col gap-4 ">
          <ClassSchedule
            classData={classData}
            isLoading={isFetchingClassData}
          />
          <ClassPraetorian />
        </div>
        <div></div>
      </div>

      <div className="mt-6 flex-1 justify-center mb-4 flex-col flex">
        <div className="flex mb-4 items-center">
          <p className="flex-1 text-xl h-fit">
            All Users <span className="ml-2 text-xl text-slate-500">100</span>
          </p>
          <SearchInput />
          <Button
            variant={"accent"}
            className="ml-4"
            onClick={handleOpenAssignMemberModal}
          >
            Manage Members
          </Button>
        </div>
        <ClassMemberTable />
      </div>
    </div>
  );
}

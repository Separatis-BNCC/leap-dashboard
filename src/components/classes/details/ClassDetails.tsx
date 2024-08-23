import { AssignMemberContext } from "@/components/classes/AssignMember";
import ClassMemberTable from "@/components/classes/ClassMemberTable";
import { useDialog } from "@/components/general/Dialog";
import { Button } from "@/components/ui/Button";
import SearchInput from "@/components/ui/SearchInput";
import { Navigate, useOutletContext, useParams } from "react-router-dom";
import { ClassContext } from "@/pages/ClassLayout";
import ClassDetailStats from "./ClassDetailStats";
import ClassPraetoCard from "./ClassPraetoCard";
import ClassSchedule from "./ClassSchedule";

export default function ClassDetails() {
  const { showDialog } = useDialog();
  const { classData } = useOutletContext<ClassContext>();
  const { classId } = useParams();

  if (!classId) return <Navigate to={"/dashboard"} />;

  return (
    <div className="flex flex-1 flex-col mt-2">
      <div className="grid gap-6 grid-cols-[5fr_3fr]">
        <article className="bg-white border border-border rounded-md p-6 grid gap-10 grid-cols-[minmax(20rem,4fr)_5fr]">
          <ClassPraetoCard />
          <ClassSchedule />
        </article>
        <ClassDetailStats />
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
        <ClassMemberTable />
      </div>
    </div>
  );
}

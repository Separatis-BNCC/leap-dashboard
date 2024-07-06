import ClassMemberTable from "@/components/classes/ClassMemberTable";
import ClassSchedule from "@/components/classes/ClassSchedule";

export default function Classes() {
  return (
    <div className="p-8 flex flex-1 flex-col">
      <p className="mb-1">Class</p>
      <h1 className="text-dark font-semibold text-3xl">FE-A</h1>
      <ClassSchedule />
      <ClassMemberTable />
    </div>
  );
}

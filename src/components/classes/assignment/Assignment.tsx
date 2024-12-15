import AssignmentProgress from "./AssignmentProgress";
import AssignmentStats from "./AssignmentStats";
import AssignmentTable from "./AssignmentTable";

// get assignment by id -> butuh idnya assingment
export default function Assignment() {
  return (
    <div className="mt-6 flex flex-col flex-1">
      <div className="grid grid-cols-2 gap-6 mb-6 rounded-md p-6 border border-border bg-white">
        <AssignmentStats />
        <AssignmentProgress />
      </div>
      <AssignmentTable />
    </div>
  );
}

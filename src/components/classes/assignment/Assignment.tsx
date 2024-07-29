import AssignmentTable from "./AssignmentTable";
import ProjectCard from "./ProjectCard";
import ProjectCase from "./ProjectCase";

export default function Assignment() {
  return (
    <div className="mt-6 flex flex-col">
      <div className="grid grid-cols-2 gap-6 mb-6">
        <ProjectCard />
        <ProjectCase />
      </div>
      <AssignmentTable />
    </div>
  );
}

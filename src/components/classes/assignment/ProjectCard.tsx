import Badge from "@/components/general/Badge";
import { Progress } from "@/components/ui/Progress";

export default function ProjectCard() {
  return (
    <div className="flex flex-col bg-white border-lihter border-[1px] px-8 py-6 rounded-md">
      <div className="flex items-center gap-4">
        <h2 className="text-dark text-2xl font-semibold">Mid Project</h2>
        <Badge variant={"primary"}>First Semester</Badge>
        <div className="flex-1"></div>
        <i className="bx bx-chevron-down text-xl"></i>
      </div>
      <div className="flex-1"></div>
      <h3 className="text-3xl font-semibold text-highlight mb-2 mt-6">60%</h3>
      <Progress value={60} />
      <p className="text-light mt-3">
        6 / 10 Members have completed the assignment
      </p>
    </div>
  );
}

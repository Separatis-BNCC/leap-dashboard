import { Button } from "../ui/Button";
import AttendanceRate from "./AttendanceRate";

export default function TotalMembers() {
  return (
    <article className="bg-white grid grid-cols-2 px-7 pb-6 pt-5 rounded-md border border-border">
      <section>
        <p className="flex items-center  gap-2">
          <i className="bx bx-user text-xl"></i>
          <span>Total Members</span>
        </p>
        <div className="mt-12 flex items-center gap-4">
          <h2 className="text-5xl text-highlight font-semibold">350</h2>
          <i className="bx bx-chevron-right text-2xl bg-border text-dark rounded-full w-[2rem] aspect-square flex items-center justify-center"></i>
        </div>
        <p className="text-light mt-1">Regular Class Members</p>
        <Button variant={"outline"} className="rounded-full mt-4 py-2 h-fit">
          See Details
        </Button>
      </section>
      <AttendanceRate />
    </article>
  );
}

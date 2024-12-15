import { Button } from "../ui/Button";
import AgendaSchedule from "./AgendaSchedule";

export default function CurrentAgenda() {
  return (
    <div className="bg-white p-7 py-6 border border-border rounded-md grid grid-cols-[3fr_2fr]">
      <section className=" flex flex-col">
        <p className="flex items-center  gap-2">
          <i className="bx bx-calendar text-xl"></i>
          <span>Current Agenda</span>
        </p>
        <div className="flex flex-col flex-1 ">
          <div className="flex-1 justify-center flex flex-col ">
            <p className="text-light">Regular Class</p>
            <h2 className="text-4xl text-highlight font-semibold mt-1">
              Session 14
            </h2>
          </div>
          <Button variant={"outline"} className="w-fit px-6 rounded-full">
            View Schedule
          </Button>
        </div>
      </section>
      <AgendaSchedule />
    </div>
  );
}

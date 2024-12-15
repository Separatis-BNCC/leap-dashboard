import { Classes } from "@/lib/types";
import { Progress } from "../ui/Progress";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import ClassCardPopover from "./ClassCardPopover";

export default function ClassCard(classes: Classes) {
  const navigate = useNavigate();
  const { name, id } = classes;
  // TEMP
  const memberCount = 0;
  const rescheduleCount = 0;
  const progress = 50;

  return (
    <div
      className="bg-white pt-5 rounded-md transition-all border border-border hover:shadow-lg hover:shadow-highlight/10 cursor-pointer"
      onClick={() => navigate(`/classes/${id}/details`)}
    >
      <div className="px-6  mb-5">
        <div className="flex justify-between items-center gap-2 mb-4 ">
          <h2 className="text-2xl text-dark font-semibold ">{name}</h2>
          <div className="flex-1">
            <li className="flex items-center  justify-center gap-2 w-fit px-3 py-[2px] ">
              <i className="bx bx-user text-lg text-light"></i>
              <p className="text-light">24</p>
            </li>
          </div>
        </div>
        <ul className="flex whitespace-nowrap items-center [&_*]:text-light gap-3">
          <li className="flex items-center justify-center gap-2 border-[1px] border-slate-200 rounded-full w-fit px-3 py-[2px] bg-slate-50">
            <i className="bx bx-calendar text-lg "></i>
            <p className="">Monday</p>
          </li>
          <li className="flex items-center justify-center gap-2 border-[1px] border-slate-200 rounded-full w-fit px-3 py-[2px] bg-slate-50">
            <i className="bx bx-time-five text-lg"></i>
            <p>17.20 - 19.00</p>
          </li>
          <div className="flex-1 flex justify-end ">
            <i className="bx bx-chevron-right text-3xl !text-dark"></i>
          </div>
        </ul>{" "}
      </div>

      <Progress value={progress} className="h-[0.25rem]" />
    </div>
  );
}

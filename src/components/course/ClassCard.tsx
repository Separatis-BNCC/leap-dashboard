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
    <div className="bg-white py-8 rounded-md transition-all border-slate-200 border-[1px]">
      <p className="text-light px-8 mb-1">Class Name</p>
      <div className="flex justify-between mb-4 px-8  ">
        <h2 className="text-3xl text-dark font-semibold ">{name}</h2>
        <ClassCardPopover classes={classes} />
      </div>
      <div className="px-8">
        <ul className="flex whitespace-nowrap items-center [&_*]:text-light gap-3 mb-12">
          <li className="flex items-center justify-center gap-2 border-[1px] border-slate-200 rounded-full w-fit px-3 py-[2px] bg-slate-50">
            <i className="bx bx-calendar text-lg "></i>
            <p className="">Monday</p>
          </li>
          <li className="flex items-center justify-center gap-2 border-[1px] border-slate-200 rounded-full w-fit px-3 py-[2px] bg-slate-50">
            <i className="bx bx-time-five text-lg"></i>
            <p>17.20 - 19.00</p>
          </li>
          <li className="flex items-center justify-center gap-2 border-[1px] border-slate-200 rounded-full w-fit px-3 py-[2px] bg-slate-50">
            <i className="bx bx-user text-lg"></i>
            <p>24</p>
          </li>
        </ul>
        <div>
          <div className="flex justify-between mb-2">
            <p className="text-2xl text-highlight font-semibold">{progress}%</p>
            <p className="text-light">
              <span className="text-dark">11</span>/13 Sessions
            </p>
          </div>
          <Progress value={progress} className="" />
        </div>
        <Button
          className="w-full py-6 mt-5"
          variant={"secondary"}
          onClick={() => navigate(`/classes/${id}`)}
        >
          View Details
        </Button>{" "}
      </div>
    </div>
  );
}

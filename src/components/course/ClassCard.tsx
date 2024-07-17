import { Classes } from "@/lib/types";
import { Progress } from "../ui/Progress";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";

export default function ClassCard({ name, day_of_week, id }: Classes) {
  const navigate = useNavigate();

  // TEMP
  const memberCount = 0;
  const rescheduleCount = 0;
  const progress = 50;

  return (
    <div className="bg-white px-8 py-7 rounded-md transition-all">
      <div className="flex justify-between mb-2">
        <h2 className="text-3xl text-dark font-semibold ">{name}</h2>
        <i className="bx bx-dots-vertical-rounded text-2xl text-light"></i>
      </div>
      <ul className="flex items-center [&_*]:text-light gap-4 mb-12">
        <li className="flex items-center justify-center gap-2 ">
          <i className="bx bx-calendar text-lg "></i>
          <p>Monday</p>
        </li>
        <li className="flex items-center justify-center gap-2">
          <i className="bx bx-time-five text-lg"></i>
          <p>17.20 - 19.00</p>
        </li>
        <li className="flex items-center justify-center gap-2">
          <i className="bx bx-user text-lg"></i>
          <p>24</p>
        </li>
      </ul>
      <div>
        <div className="flex justify-between mb-1">
          <p className="text-light">{progress}%</p>
          <p className="text-light">
            <span className="text-dark">11</span>/13 Sessions
          </p>
        </div>
        <Progress value={progress} />
      </div>
      <Button
        className="w-full py-6 mt-5"
        variant={"secondary"}
        onClick={() => navigate(`/classes/${id}`)}
      >
        View Details
      </Button>
    </div>
  );
}

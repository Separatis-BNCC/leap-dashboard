import useClassQuery from "@/hooks/class/useClassQuery";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import ClassTime from "./ClassTime";
import UpcomingClassCountdown from "./UpcomingClassCountdown";
import ClassSchedulePicker from "./ClassSchedulePicker";

export default function ClassSchedule() {
  const { classId } = useParams();
  const { classData } = useClassQuery({ classId });

  const scheduleExists = classData?.day_of_week && classData?.hour;

  return (
    <div className="flex flex-col items-start justify-center">
      <p className="text-light mb-4">Scheduled Class</p>
      <ClassTime classData={classData} />
      <ClassSchedulePicker className="mt-6" classData={classData} />
    </div>
  );
}

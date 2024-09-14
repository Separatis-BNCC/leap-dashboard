import useClassQuery from "@/hooks/class/useClassQuery";
import { useParams } from "react-router-dom";
import ClassTime from "./ClassTime";
import ClassSchedulePicker from "./ClassSchedulePicker";

export default function ClassSchedule() {
  const { classId } = useParams();
  const { classData } = useClassQuery({ classId });

  return (
    <div className="flex flex-col items-start justify-center">
      <p className="text-light mb-4">Scheduled Class</p>
      <ClassTime classData={classData} />
      <ClassSchedulePicker className="mt-6" classData={classData} />
    </div>
  );
}

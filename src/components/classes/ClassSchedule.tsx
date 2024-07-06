import { Calendar } from "../ui/Calendar";

export default function ClassSchedule() {
  return (
    <div className="grid grid-cols-[auto_1fr] mt-6">
      <Calendar className="bg-white w-fit" />
      <div></div>
    </div>
  );
}

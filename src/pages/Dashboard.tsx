import CourseList from "@/components/dashboard/CourseList";
import StatsCardList from "@/components/dashboard/StatsCardList";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-2 p-8 gap-4">
      <StatsCardList />

      <CourseList />
      <div className=""></div>
      <div></div>
    </div>
  );
}

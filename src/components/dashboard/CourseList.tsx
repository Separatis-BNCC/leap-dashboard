import CourseCard from "./CourseCard";

const courses = [
  {
    name: "Frontend",
    memberCount: 154,
    status: "On Going",
  },
  {
    name: "Frontend",
    memberCount: 154,
    status: "On Going",
  },
  {
    name: "Frontend",
    memberCount: 154,
    status: "On Going",
  },
  {
    name: "Frontend",
    memberCount: 154,
    status: "On Going",
  },
  {
    name: "Frontend",
    memberCount: 154,
    status: "On Going",
  },
];

export default function CourseList() {
  return (
    <div className="bg-white rounded-md">
      <div className="p-4 px-6">
        <h2 className="font-semibold text-xl">Courses</h2>
        <p className="text-light mb-0">Select any to view course details</p>
      </div>

      <ul className="grid">
        {courses.map((course) => {
          return <CourseCard {...course} />;
        })}
      </ul>
    </div>
  );
}

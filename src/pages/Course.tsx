import ClassCard from "@/components/course/ClassCard";
import CourseClass from "@/components/course/CourseClass";
import CourseSession from "@/components/course/CourseSession";
import SessionList from "@/components/course/SessionList";
import SessionTable from "@/components/course/SessionTable";
import { useDialog } from "@/components/general/Dialog";
import { Button } from "@/components/ui/Button";
import useCourseQuery from "@/hooks/course/useCourseQuery";
import { cn, getRegion, sluggify } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate, useParams } from "react-router-dom";

// const courses: CourseList = {
//   frontend: {
//     display: "Frontend",
//     sessions: [
//       {
//         title: "Object Oriented Apporach in Javascript",
//         outlineCount: 6,
//         id: "12312312",
//       },
//       {
//         title: "Object Oriented Apporach in Javascript",
//         outlineCount: 6,
//         id: "12312313443",
//       },
//       {
//         title: "Object Oriented Apporach in Javascript",
//         outlineCount: 6,
//         id: "234342",
//       },
//       {
//         title: "Object Oriented Apporach in Javascript",
//         outlineCount: 6,
//         id: "23444444",
//       },
//       {
//         title: "Object Oriented Apporach in Javascript This is Long",
//         outlineCount: 6,
//         id: "99353",
//       },
//       {
//         title: "Object Oriented Apporach in Javascript This is Long",
//         outlineCount: 6,
//         id: "344234",
//       },
//       {
//         title:
//           "Object Oriented Apporach in Javascript This is Long Object Oriented Apporach in Javascript This is Long ",
//         outlineCount: 6,
//         id: "34434343566",
//       },
//       {
//         title: "Object Oriented Apporach in Javascript This is Long",
//         outlineCount: 6,
//         id: "344343435000",
//       },
//       {
//         title: "Object Oriented Apporach in Javascript This is Long",
//         outlineCount: 6,
//         id: "344343435003424",
//       },
//     ],
//     class: [
//       {
//         name: "FE-A",
//         praetorian: "Jacqueline Audrey",
//         memberCount: 10,
//       },
//       {
//         name: "FE-B",
//         praetorian: "Gagaz Manqunazara",
//         memberCount: 9,
//       },
//       {
//         name: "FE-C",
//         praetorian: "Joseph Yusmita",
//         memberCount: 10,
//         rescheduledCount: 2,
//       },
//     ],
//   },
// };

export default function Course() {
  const { coursesData, coursesQuery } = useCourseQuery();
  const { showDialog } = useDialog();
  const navigate = useNavigate();
  const { name } = useParams();

  useEffect(() => {
    if (coursesQuery.isLoading) navigate("/dashboard");
  }, [coursesQuery.isLoading, navigate]);

  const course = useMemo(
    () => coursesData?.find((course) => sluggify(course.name) === name),
    [name, coursesData]
  );

  if (!course) return;

  return (
    <div className="p-8 w-full flex-1 flex flex-col">
      <div>
        <p className="text-light mb-1">Course</p>
      </div>
      <div className="flex items-center mb-4">
        <div className="flex-1 flex items-center gap-4">
          <h1 className="text-3xl text-dark font-semibold ">{course.name}</h1>
          <div className="bg-white px-3 py-[0.125rem] text-highlight rounded-full">
            {getRegion(course.region)}
          </div>
        </div>
      </div>
      <CourseSession course={course} />
      <CourseClass course={course} />

      {/* Ini sementara doank */}
      <div className="flex gap-2 mt-12 items-center ">
        <Button
          variant={"destructive"}
          className="mt-4"
          onClick={() => showDialog("delete-course", course)}
        >
          Delete Course
        </Button>
        <p>(Tar ini dipindahin)</p>
      </div>
    </div>
  );
}

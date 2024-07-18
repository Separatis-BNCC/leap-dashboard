import CourseClass from "@/components/course/CourseClass";
import CourseSession from "@/components/course/CourseSession";
import { useDialog } from "@/components/general/Dialog";
import { Button } from "@/components/ui/Button";
import useCourseQuery from "@/hooks/course/useCourseQuery";
import { Course as TCourse } from "@/lib/types";
import { getRegion } from "@/lib/utils";
import { useEffect } from "react";
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
  const { showDialog } = useDialog();
  const navigate = useNavigate();
  const { name } = useParams();
  const courseId = Number(name?.split("-").at(-1));

  const { courseData, courseQuery } = useCourseQuery({ id: courseId });

  // useEffect(() => {
  //   if (courseQuery.isLoading) navigate("/dashboard");
  // }, [courseQuery.isLoading, navigate]);

  return (
    <div className="p-8 w-full flex-1 flex flex-col">
      <div>
        <p className="text-light mb-1">Course</p>
      </div>
      <div className="flex items-center mb-4">
        <div className="flex-1 flex items-center gap-4">
          <h1 className="text-3xl text-dark font-semibold ">
            {courseData?.name || (
              <Skeleton width={"15rem"} className="text-3xl" />
            )}
          </h1>
          {courseData?.region ? (
            <div className="bg-white px-3 py-[0.125rem] text-highlight rounded-full">
              {getRegion(courseData.region)}
            </div>
          ) : (
            <Skeleton
              width={"5rem"}
              className="text-xl"
              borderRadius={"9999px"}
            />
          )}
        </div>
      </div>
      <div></div>
      <div></div>
      <CourseSession course={courseData} />
      <CourseClass course={courseData} />

      {/* Ini sementara doank */}
      <div className="flex gap-2 mt-24 items-center justify-center">
        <Button
          variant={"destructive"}
          className="mt-4"
          onClick={() => showDialog("delete-course", courseData)}
        >
          Delete Course
        </Button>
        {/* <p>(Tar ini dipindahin)</p> */}
      </div>
    </div>
  );
}

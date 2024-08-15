import CourseClass from "@/components/course/CourseClass";
import CourseSession from "@/components/course/CourseSession";
import { useDialog } from "@/components/general/Dialog";
import useCourseQuery from "@/hooks/course/useCourseQuery";
import { getRegion } from "@/assets/lookup-data";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/Button";

export default function Course() {
  const { showDialog } = useDialog();
  const { name } = useParams();
  const courseId = Number(name?.split("-").at(-1));

  const { courseData } = useCourseQuery({ id: courseId });

  return (
    <div className="p-8 w-full flex-1 flex flex-col">
      <div className="grid grid-cols-[1fr_auto] mb-6">
        <p className="text-light mb-1 col-span-2">Course</p>
        <div className="flex gap-4 items-center">
          <h1 className="text-3xl text-dark font-semibold ">
            {courseData?.name || (
              <Skeleton width={"15rem"} className="text-3xl" />
            )}
          </h1>
          {courseData?.region ? (
            <div className="bg-white px-3 py-[0.125rem] text-highlight rounded-full">
              {getRegion(courseData?.region)}
            </div>
          ) : (
            <Skeleton
              width={"5rem"}
              className="text-xl"
              borderRadius={"9999px"}
            />
          )}
        </div>
        <Button variant={"outline"}>Modules</Button>
      </div>
      <CourseSession course={courseData} />
      <CourseClass course={courseData} />
    </div>
  );
}

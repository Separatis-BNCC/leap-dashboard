import CourseClass from "@/components/course/CourseClass";
import CourseSession from "@/components/course/CourseSession";
import { useDialog } from "@/components/general/Dialog";
import { Button } from "@/components/ui/Button";
import useCourseQuery from "@/hooks/course/useCourseQuery";
import { getRegion } from "@/assets/lookup-data";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";

export default function Course() {
  const { showDialog } = useDialog();
  const { name } = useParams();
  const courseId = Number(name?.split("-").at(-1));

  const { courseData } = useCourseQuery({ id: courseId });

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
      <CourseSession course={courseData} />
      <CourseClass course={courseData} />

      {/* Ini sementara doank */}
      {/* <div className="flex gap-2 mt-24 items-center justify-center">
        <Button
          variant={"destructive"}
          className="mt-4"
          onClick={() => showDialog("delete-course", courseData)}
        >
          Delete Course
        </Button>
      </div> */}
    </div>
  );
}

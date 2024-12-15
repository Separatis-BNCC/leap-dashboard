import CourseClass from "@/components/course/CourseClass";
import useCourseQuery from "@/hooks/course/useCourseQuery";
import { getRegion } from "@/assets/lookup-data";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import SessionList from "@/components/course/SessionList";
import { useDialog } from "@/components/general/Dialog";

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
        <Button
          variant={"accent"}
          onClick={() => showDialog("course-start-warning", courseId)}
        >
          Start Course
        </Button>
      </div>
      <div className="bg-white p-4 border border-border rounded-md">
        <div className="flex gap-2 mb-2 items-center">
          <i className="bx bx-book text-lg text-dark"></i>
          <h3 className="text-dark ">
            Sessions
            <span className="text-light ml-2">
              {courseData?.sessions.length || (
                <Skeleton height={"1rem"} width={"2rem"} />
              )}
            </span>
          </h3>
        </div>
        <SessionList sessions={courseData?.sessions} />
      </div>
      <section className="grid grid-cols-2 flex-1">
        <CourseClass course={courseData} />
      </section>
    </div>
  );
}

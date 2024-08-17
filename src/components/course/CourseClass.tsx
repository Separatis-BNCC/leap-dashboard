import { Course } from "@/lib/types";
import ClassCard from "./ClassCard";
import { Button } from "../ui/Button";
import { useDialog } from "../general/Dialog";
import Skeleton from "react-loading-skeleton";
import { ScrollArea } from "../general/ScrollArea";

type Props = {
  course?: Course;
};

export default function CourseClass({ course }: Props) {
  const { showDialog } = useDialog();

  return (
    <div className="mt-8 flex-1 flex flex-col bg-white p-6 py-4 rounded-md border border-border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-dark font-semibold text-lg">Class</h2>
        <Button
          disabled={!course}
          variant={"tertiary"}
          onClick={() => showDialog("add-class", course?.id)}
        >
          + Class
        </Button>
      </div>
      {course && course.classes.length === 0 ? (
        <div className="py-6 rounded-md flex items-center min-h-[25rem] justify-center flex-col border-[3px] border-lighter border-dotted h-full">
          <h2 className="text-2xl text-dark font-semibold mb-1">
            No Classes Found
          </h2>
          <p className="text-light mb-5">
            Looks like you haven't added any classes yet
          </p>
          <Button
            variant={"accent"}
            className="py-5 px-7"
            onClick={() => showDialog("add-class", course.id)}
          >
            Add Class +
          </Button>
        </div>
      ) : (
        <ScrollArea className="flex-1 h-0  min-h-[25rem] ">
          <div className="grid gap-4 flex-1">
            {course
              ? course.classes.map((classData) => (
                  <ClassCard key={classData.id} {...classData} />
                ))
              : new Array(3)
                  .fill("x")
                  .map((_, i) => <Skeleton key={i} height={"8.5rem"} />)}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}

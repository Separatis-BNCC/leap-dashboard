import { Course } from "@/lib/types";
import ClassCard from "./ClassCard";
import { Button } from "../ui/Button";
import { useDialog } from "../general/Dialog";

type Props = {
  course: Course;
};

export default function CourseClass({ course }: Props) {
  const { showDialog } = useDialog();

  if (course.classes.length === 0)
    return (
      <div className="mt-4 flex-1">
        <h2 className="text-light mb-2">Class</h2>
        <div className="mt-4 py-6 rounded-md flex items-center justify-center flex-col border-[3px] border-lighter border-dotted h-full">
          <h2 className="text-2xl text-dark font-semibold mb-1">
            No Classes Found
          </h2>
          <p className="text-light mb-5">
            Looks like you haven't added any classes yet
          </p>
          <Button
            variant={"accent"}
            className="py-5 px-7"
            onClick={() => showDialog("add-session", course.id)}
          >
            Add Class +
          </Button>
        </div>
      </div>
    );

  return (
    <div className="mt-8">
      <h2 className="text-light mb-2">Class</h2>

      <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1">
        {course.classes.map((classData) => (
          <ClassCard {...classData} />
        ))}
      </div>
    </div>
  );
}

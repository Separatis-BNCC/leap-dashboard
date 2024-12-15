import { useState } from "react";
import { useDialog } from "../general/Dialog";
import { Button } from "../ui/Button";
import SessionList from "./SessionList";
import SessionTable from "./SessionTable";
import { cn } from "@/lib/utils";
import { Course } from "@/lib/types";

type Props = {
  course?: Course;
};

export default function CourseSession({ course }: Props) {
  // const { showDialog } = useDialog();

  // const [viewAsTable, setViewAsTable] = useState(false);

  return (
    <div>
      {/* <div className="flex items-center justify-end mb-4">
        <i
          className={cn(
            "bx mr-4 hover:opacity-60 transition-all duration-200 cursor-pointer text-xl text-dark",
            viewAsTable ? "bx-grid-alt" : "bx-list-ul"
          )}
          onClick={() => setViewAsTable((cur) => !cur)}
        ></i>
        <Button variant={"default"}>Modules</Button>
      </div> */}
      {/* {viewAsTable ? ( */}
      {/* <SessionTable courseId={course?.id} sessions={course?.sessions} /> */}
      {/* ) : ( */}
      <SessionList courseId={course?.id} sessions={course?.sessions} />
      {/* )} */}
    </div>
  );
}

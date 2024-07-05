import ClassCard from "@/components/course/ClassCard";
import SessionList from "@/components/course/SessionList";
import SessionTable from "@/components/course/SessionTable";
import { useDialog } from "@/components/general/Dialog";
import { Button } from "@/components/ui/Button";
import useTableSelect from "@/hooks/table/useTableSelect";
import { CourseList } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useParams } from "react-router-dom";

const courses: CourseList = {
  frontend: {
    display: "Frontend",
    sessions: [
      {
        title: "Object Oriented Apporach in Javascript",
        outlineCount: 6,
        id: "12312312",
      },
      {
        title: "Object Oriented Apporach in Javascript",
        outlineCount: 6,
        id: "12312313443",
      },
      {
        title: "Object Oriented Apporach in Javascript",
        outlineCount: 6,
        id: "234342",
      },
      {
        title: "Object Oriented Apporach in Javascript",
        outlineCount: 6,
        id: "23444444",
      },
      {
        title: "Object Oriented Apporach in Javascript This is Long",
        outlineCount: 6,
        id: "99353",
      },
      {
        title: "Object Oriented Apporach in Javascript This is Long",
        outlineCount: 6,
        id: "344234",
      },
      {
        title:
          "Object Oriented Apporach in Javascript This is Long Object Oriented Apporach in Javascript This is Long ",
        outlineCount: 6,
        id: "34434343566",
      },
      {
        title: "Object Oriented Apporach in Javascript This is Long",
        outlineCount: 6,
        id: "344343435000",
      },
      {
        title: "Object Oriented Apporach in Javascript This is Long",
        outlineCount: 6,
        id: "344343435003424",
      },
    ],
    class: [
      {
        name: "FE-A",
        praetorian: "Jacqueline Audrey",
        memberCount: 10,
      },
      {
        name: "FE-B",
        praetorian: "Gagaz Manqunazara",
        memberCount: 9,
      },
      {
        name: "FE-C",
        praetorian: "Joseph Yusmita",
        memberCount: 10,
        rescheduledCount: 2,
      },
    ],
  },
};

export default function Course() {
  const [viewAsTable, setViewAsTable] = useState(false);
  const { showDialog } = useDialog();
  const { name } = useParams();

  const data = courses[name as keyof typeof courses];
  if (!data) return <div>Unknown course: {name}</div>;

  return (
    <div className="p-8 w-full ">
      <div>
        <p className="text-light mb-1">Course</p>
      </div>
      <div className="flex items-center mb-4">
        <div className="flex-1 flex items-center gap-4">
          <h1 className="text-3xl text-dark font-semibold ">{data.display}</h1>
          <div className="bg-white px-3 py-[0.125rem] text-highlight rounded-full">
            Kemanggisan
          </div>
        </div>
        <i
          className={cn(
            "bx mr-4 hover:opacity-60 transition-all duration-200 cursor-pointer text-xl text-dark",
            viewAsTable ? "bx-grid-alt" : "bx-list-ul"
          )}
          onClick={() => setViewAsTable((cur) => !cur)}
        ></i>
        <Button variant={"tertiary"} className="mr-4">
          + Session
        </Button>
        <Button variant={"default"}>Modules</Button>
      </div>
      <div>
        {viewAsTable ? (
          <SessionTable sessions={data.sessions} />
        ) : (
          <SessionList sessions={data.sessions} />
        )}
      </div>
      <div className="mt-8">
        <h2 className="text-light mb-2">Class</h2>
        <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1">
          <ClassCard />
          <ClassCard />
        </div>
      </div>

      {/* Ini sementara doank */}
      <div className="flex gap-2 items-center ">
        <Button
          variant={"destructive"}
          className="mt-4"
          onClick={() => showDialog("delete-course", data)}
        >
          Delete Course
        </Button>
        <p>(Tar ini dipindahin)</p>
      </div>
    </div>
  );
}

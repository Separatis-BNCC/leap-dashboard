import ClassCard from "@/components/course/ClassCard";
import SessionList from "@/components/course/SessionList";
import SessionTable from "@/components/course/SessionTable";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useParams } from "react-router-dom";

const courses = {
  frontend: {
    display: "Frontend",
    sessions: [
      {
        title: "Object Oriented Apporach in Javascript",
        outlineCount: 6,
      },
      {
        title: "Object Oriented Apporach in Javascript",
        outlineCount: 6,
      },
      {
        title: "Object Oriented Apporach in Javascript",
        outlineCount: 6,
      },
      {
        title: "Object Oriented Apporach in Javascript",
        outlineCount: 6,
      },
      {
        title: "Object Oriented Apporach in Javascript This is Long",
        outlineCount: 6,
      },
      {
        title: "Object Oriented Apporach in Javascript This is Long",
        outlineCount: 6,
      },
      {
        title: "Object Oriented Apporach in Javascript This is Long",
        outlineCount: 6,
      },
      {
        title: "Object Oriented Apporach in Javascript This is Long",
        outlineCount: 6,
      },
      {
        title: "Object Oriented Apporach in Javascript This is Long",
        outlineCount: 6,
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
  const { name } = useParams();

  const data = courses[name as keyof typeof courses];
  if (!data) return <div>Unknown course: {name}</div>;

  return (
    <div className="p-8 w-full ">
      <p className="text-light mb-1">Course</p>
      <div className="flex items-center">
        <h1 className="flex-1 text-3xl text-dark font-semibold mb-6">
          {data.display}
        </h1>
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
        <div className="grid grid-cols-2 gap-4">
          <ClassCard />
          <ClassCard />
        </div>
      </div>
    </div>
  );
}

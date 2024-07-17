import RoleBadge from "../course/RoleBadge";
import { ScrollArea } from "../general/ScrollArea";

export default function ClassUpcomingSession() {
  const isEmpty = true;

  if (isEmpty)
    return (
      <div className="bg-white w-full rounded-md p-8 flex flex-col  justify-center h-0 min-h-full">
        <p className="text-dark">Upcoming Session</p>
        <div className="flex-1 flex items-center justify-center flex-col">
          <i className="bx bx-time text-[3rem]"></i>
          <h2 className="text-2xl mt-4 font-semibold text-center">
            Course Not Started
          </h2>
          <p className="text-light text-center mt-2">
            Looks like the course for this class has not been started yet
          </p>
        </div>
      </div>
    );

  return (
    <div className="bg-white w-full rounded-md p-8 flex flex-col h-0 min-h-full">
      <p className="text-dark">Upcoming Session</p>
      <div className="flex-1 mt-3 mb-10">
        <h2 className="text-2xl font-semibold">
          Object Oriented Approach in Javascript.
        </h2>
        <RoleBadge roleId={1} className="px-6 mt-4">
          Week 5
        </RoleBadge>
      </div>
      <div className="flex justify-between items-center border-b-[1px] border-lighter mb-2 pb-2">
        <p>Outlines</p>
        <i className="bx bx-edit"></i>
      </div>
      <ScrollArea className="h-full">
        <div className="grid gap-4 mt-2 [&>*]:text-light [&>*]:truncate">
          <p>1. Prototype Inheritance</p>
          <p>2. What's the difference between Java and Javascript's OOP</p>
          <p>2. What's the difference between Java and Javascript's OOP</p>
          <p>2. What's the difference between Java and Javascript's OOP</p>
          <p>2. What's the difference between Java and Javascript's OOP</p>
          <p>3. ES6 Classes</p>
        </div>
      </ScrollArea>
    </div>
  );
}

import Badge from "../general/Badge";
import { ScrollArea } from "../general/ScrollArea";
import { Button } from "../ui/Button";
import OutlineItem from "./OutlineItem";

export default function MaterialDetail() {
  return (
    <article className="bg-white [&>*]:px-8 pt-4 pb-4 max-w-[40rem] rounded-md h-[calc(100%-6rem)] flex flex-col">
      <div className="border-b-[1px] border-border pb-4 flex items-center justify-between">
        <p className="font-semibold">Material Details</p>
        <i className="bx bx-x text-xl"></i>
      </div>
      <div className="mt-6 mb-6">
        <p className="text-light mb-1">Material Title</p>
        <h2 className="text-2xl font-semibold mb-2">
          Object Oriented Approach in Javascript
        </h2>
        <Badge variant={"primary"}>Week 5</Badge>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-light">
          Outline <span className="text-dark ml-1">12</span>
        </p>
        <Button variant={"accent"}>+ Outline</Button>
      </div>
      <div className="mt-6 flex-1">
        <ScrollArea className="p-4 border-slate-200 border-[1px] bg-bg rounded-md flex flex-col h-0 min-h-full">
          <div className="grid gap-3">
            <OutlineItem />
            <OutlineItem />
            <OutlineItem />
            <OutlineItem />
            <OutlineItem />
            <OutlineItem />
            <OutlineItem />
            <OutlineItem />
            <OutlineItem />
          </div>
        </ScrollArea>
      </div>
    </article>
  );
}

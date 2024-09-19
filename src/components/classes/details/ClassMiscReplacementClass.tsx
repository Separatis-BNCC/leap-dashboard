import Badge from "@/components/general/Badge";

export default function ClassMiscReplacementClass() {
  return (
    <div className="mt-4">
      <div className="flex gap-2 bg-highlight/20 p-1 px-2 rounded-md items-center">
        <i className="bx bx-error-circle text-xl text-highlight"></i>
        <p className="text-highlight">No replacement class left</p>
      </div>
      <div className="grid grid-cols-[auto_1fr_auto_auto] border border-border rounded-md py-2 px-4 gap-4 items-center justify-between mt-4 transition-all duration-100 group cursor-pointer hover:bg-slate-50">
        <i className="bx bx-right-arrow-circle text-2xl "></i>
        <div>
          <p>Request</p>
          <p className="text-light ">Session 14</p>
        </div>
        <Badge variant={"gray"}>Pending</Badge>
        <i className="bx bx-chevron-right text-xl group-hover:translate-x-[-2px] transition-all duration-100"></i>
      </div>
      <div className="grid grid-cols-[auto_1fr_auto_auto] border border-border rounded-md py-2 px-4 gap-4 items-center justify-between mt-4 transition-all duration-100 group cursor-pointer hover:bg-slate-50">
        <i className="bx bx-right-arrow-circle text-2xl "></i>
        <div>
          <p>Request</p>
          <p className="text-light ">Session 14</p>
        </div>
        <Badge variant={"gray"}>Pending</Badge>
        <i className="bx bx-chevron-right text-xl group-hover:translate-x-[-2px] transition-all duration-100"></i>
      </div>
    </div>
  );
}

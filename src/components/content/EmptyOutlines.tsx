import { Button } from "../ui/Button";

export default function EmptyOutlines() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 absolute inset-0">
      <div className="flex flex-col items-center justify-center border-[1px] border-dashed border-slate-400 w-full h-full rounded-md">
        <div className="text-2xl font-semibold">No Outlines</div>
        <p className="text-light mt-1">
          Looks like there is no outline for this session yet
        </p>
      </div>
    </div>
  );
}

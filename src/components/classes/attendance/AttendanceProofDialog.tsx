import { useDialog } from "@/components/general/Dialog";

export type AttendanceProofContext = {
  imgURL: string;
  name: string;
  email: string;
  week: number;
};

export default function AttendanceProofDialog() {
  const {
    contextData: { email, imgURL, name, week },
  } = useDialog<AttendanceProofContext>();

  return (
    <article className="max-w-[60rem] w-full bg-white p-2 rounded-md relative">
      <img src={imgURL} className="h-[30rem] w-full object-cover rounded-md " />
      <div className="bg-white text-dark rounded-md absolute left-4 top-4 px-3 py-1">
        Session {week} - Attendance Proof
      </div>
      <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-[1px] my-3 px-3">
        <div className="row-span-2 w-10 aspect-square rounded-full bg-slate-300"></div>
        <p className="truncate">{name}</p>
        <p className="text-light truncate">{email}</p>
      </div>
    </article>
  );
}

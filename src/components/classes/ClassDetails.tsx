import ClassCardPopover from "../course/ClassCardPopover";
import { useDialog } from "../general/Dialog";
import ProfilePicture from "../general/ProfilePicture";
import DonutChart from "../ui/DonutChart";

export default function ClassDetails() {
  const { showDialog } = useDialog();

  return (
    <div className="bg-white  pb-8 pt-3 rounded-md grid grid-cols-[auto_1fr] whitespace-nowrap gap-x-14 border-[1px] border-slate-200">
      <div className="col-span-2 mb-4 pb-3 flex justify-between border-b-[1px] items-center px-8 ">
        <p className="col-span-2 ">Class Details</p>
        <ClassCardPopover />
      </div>
      <div className="pl-8 flex flex-col  items-center justify-center ">
        <DonutChart percent={50}>
          <div className="flex items-center justify-center text-4xl h-full text-highlight font-semibold">
            50%
          </div>
        </DonutChart>
        <p className="flex gap-1 text-light mt-8 text-center">
          <span className="text-dark">8</span>
          out of
          <span className="text-dark">12</span>
          Session(s) Done
        </p>
      </div>
      <div className="pr-8">
        <p className="text-light mb-1">Course</p>
        <h2 className="text-dark font-semibold text-2xl mb-5">Front-End</h2>
        <div className="flex items-center gap-4 [&>*]:text-light mb-8">
          <div className="flex gap-2 items-center border-slate-200 border-[1px] rounded-full bg-slate-50 px-3">
            <i className="bx bx-calendar text-lg"></i>
            <p className="mr-2">Monday</p>
          </div>
          <div className="flex gap-2 items-center border-slate-200 border-[1px] rounded-full bg-slate-50 px-3">
            <i className="bx bx-time-five text-lg"></i>
            <p>17.20 - 19.00</p>
          </div>
        </div>
        <div className="grid grid-cols-[auto_1fr_auto] gap-x-2 items-center ">
          <ProfilePicture className="row-span-2 h-[2.5rem] aspect-square" />
          <p className="text-light">Praetorian</p>
          <i
            className="bx bx-edit text-xl text-light row-span-2 hover:text-lighter cursor-pointer duration-100 transition-all"
            onClick={() => {
              showDialog("assign-praeto");
            }}
          ></i>
          <p className="text-dark">Jacqueline Audrey I.</p>
        </div>
        <div className="grid grid-cols-2 gap-x-6 mt-8">
          <div className="rounded-md border-lighter border-[1px] py-3 px-5">
            <div className="flex items-center gap-2">
              <i className="bx bx-user text-lg"></i>
              <p>Members</p>
            </div>
            <h2 className="text-3xl font-semibold mt-2">25</h2>
          </div>
          <div className="rounded-md border-lighter border-[1px] p-3 px-5">
            <div className="flex items-center gap-2">
              <i className="bx bx-user text-lg"></i>
              <p>Rescheduled</p>
            </div>
            <h2 className="text-3xl font-semibold mt-2">0/5</h2>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}

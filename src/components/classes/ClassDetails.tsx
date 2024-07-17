import { useDialog } from "../general/Dialog";
import ProfilePicture from "../general/ProfilePicture";
import DonutChart from "../ui/DonutChart";

export default function ClassDetails() {
  const { showDialog } = useDialog();

  return (
    <div className="bg-white px-8 pb-8 pt-6 rounded-md grid grid-cols-[auto_1fr] whitespace-nowrap gap-x-14">
      <p className="col-span-2 mb-6">Class Details</p>
      <div className="flex flex-col  items-center justify-center">
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
      <div>
        <p>Course</p>
        <h2 className="text-dark font-semibold text-2xl mb-1">Front-End</h2>
        <div className="flex items-center gap-2 [&>*]:text-light mb-6">
          <i className="bx bx-calendar text-lg"></i>
          <p className="mr-2">Monday</p>
          <i className="bx bx-time-five text-lg"></i>
          <p>17.20 - 19.00</p>
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
      </div>
    </div>
  );
}

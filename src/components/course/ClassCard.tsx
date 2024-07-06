import { Progress } from "../ui/Progress";

export default function ClassCard() {
  const progress = 50;

  return (
    <div className="bg-white px-8 py-7 rounded-md">
      <div className="flex justify-between">
        <h2 className="text-3xl text-dark font-semibold mb-4">FE-A</h2>
        <div className="flex gap-4 border-[1px] border-border items-center justify-center h-fit px-4 py-2 rounded-md">
          <i className="bx bx-calendar text-dark text-lg"></i>
          <p className="text-dark">Monday, Thursday</p>
        </div>
      </div>
      <div className="flex gap-4 items-center mb-2">
        <img
          className="h-7 object-cover aspect-square rounded-full overflow-hidden"
          src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <p>Prateo Name</p>
      </div>
      <ul className="flex mb-8 mt-6 gap-8">
        <li className="flex items-center justify-center gap-3">
          <p className="bg-bg text-highlight w-12 aspect-square rounded-md flex font-semibold items-center justify-center text-xl">
            10
          </p>
          <p className="text-light ">Member</p>
        </li>
        <li className="flex items-center justify-center gap-3">
          <p className="bg-bg text-highlight w-12 aspect-square rounded-md flex font-semibold items-center justify-center text-xl">
            0
          </p>
          <p className="text-light ">Rescheduled</p>
        </li>
      </ul>
      <div>
        <div className="flex justify-between mb-1">
          <p className="text-light">{progress}%</p>
          <p className="text-light">
            <span className="text-dark">11</span>/13 Sessions
          </p>
        </div>
        <Progress value={progress} />
        <p className="text-light mt-4">Start date: 02 July, 2024</p>
      </div>
    </div>
  );
}

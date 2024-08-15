import { PieChart } from "react-minimal-pie-chart";

export default function OverallProgress() {
  return (
    <article className="bg-gradient-to-b rounded-md from-highlight-dark to-[#0B13D3] w-full p-6 pt-7 flex flex-col">
      <div className="flex justify-between items-center">
        <p className="text-white font-normal">Overall Progress</p>
        <p className="text-lighter">LnT 35</p>
      </div>
      <div className="px-10 mt-10 flex-1 relative flex items-center justify-center">
        <div className="flex flex-col items-center absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
          <h3 className="text-5xl text-white font-semibold mb-1">75%</h3>
          <p className="text-lighter">Progress</p>
        </div>
        <PieChart
          className="aspect-square h-full min-h-0 max-h-[20rem]"
          data={[
            {
              value: 1,
              color: "#8D91FF",
            },
            {
              value: 1,
              color: "#2BF2FF",
            },
            {
              value: 2,
              color: "#0066FF",
            },
          ]}
          lineWidth={18}
        />{" "}
      </div>
      <div className="bg-gradient-to-b from-white/10 top-white/0 mt-8 whitespace-nowrap rounded-md p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="w-3 aspect-square rounded-full bg-highlight"></div>
          <p className="text-white flex-1">Regular Class</p>
          <p className="text-lighter">12 Sessions Done</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 aspect-square rounded-full bg-[#2BF2FF]"></div>
          <p className="text-white flex-1">Projects</p>
          <p className="text-lighter">2 Completed</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 aspect-square rounded-full bg-[#8D91FF]"></div>
          <p className="text-white flex-1">On Progress</p>
          <p className="text-lighter">3 Sessions</p>
        </div>
      </div>
    </article>
  );
}

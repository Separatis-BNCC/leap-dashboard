import MultiLineProgressionBar from "./MultiLineProgressionBar";

export default function AssignmentProgress() {
  return (
    <article className="p-6 rounded-md bg-gradient-to-bl from-highlight-dark to-[#0B13D3]">
      <h2 className="text-4xl text-white">Mid Project</h2>
      <p className="text-lighter mt-1">First Semester</p>

      <div className="flex gap-4 mt-10">
        <p className="flex gap-2 items-centser">
          <div className="w-2 h-2 rounded-full bg-cyan"></div>
          <span className="text-white">Graded</span>
        </p>
        <p className="flex gap-2 items-center">
          <div className="w-2 h-2 rounded-full bg-highlight"></div>
          <span className="text-white">Submitted</span>
        </p>
      </div>

      <MultiLineProgressionBar
        className="mt-2"
        data={[
          {
            color: "#2BF2FF",
            value: 4,
            textColor: "#0066FF",
          },
          {
            color: "#0066FF",
            value: 4,
            textColor: "white",
          },
          {
            color: "#8D91FF",
            value: 3,
            textColor: "white",
            disableTooltip: true,
          },
        ]}
        enableTooltip
      />
    </article>
  );
}

export default function ClassDetailStats() {
  return (
    <div className="grid grid-rows-2 gap-4 h-0 min-h-full">
      <article className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-x-4 gap-y-2 bg-white px-6 pb-4 py-3 border border-border rounded-md">
        <div className="flex gap-2 items-center col-span-2">
          <i className="bx bx-line-chart text-lg text-dark"></i>
          <p className="text-dark">Participation Rate</p>
        </div>

        <h2 className="text-5xl text-highlight self-center">75%</h2>
        <p className="text-light self-center">
          5 out of 10 members participated in the previous class
        </p>
      </article>
      <article className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-x-4 gap-y-2 bg-white px-6 pb-4 py-3 border border-border rounded-md">
        <div className="flex gap-2 items-center col-span-2">
          <i className="bx bx-line-chart text-lg text-dark"></i>
          <p className="text-dark">Replacement Class</p>
        </div>

        <h2 className="text-5xl text-highlight self-center">N/A</h2>
        <p className="text-light self-center">
          5 out of 10 members participated in the previous class
        </p>
      </article>
    </div>
  );
}

export default function ClassMiscStatistics() {
  return (
    <div className="pt-4 grid grid-rows-2 items-center flex-1 gap-4">
      <article className="border-border border rounded-md p-4 py-3 items-center grid grid-cols-[auto_1fr_auto] gap-4 h-full">
        <i className="bx bxs-bar-chart-alt-2 text-3xl"></i>
        <div>
          <h3 className="text-lg">Participation</h3>
          <p className="text-light mt-1 line-clamp-2">
            5 out of 10 members participated in the previous class
          </p>
        </div>
        <p className="bg-highlight text-white h-fit px-2 py-1 rounded-md text-lg">
          50%
        </p>
      </article>
      <article className="border-border border rounded-md p-4 py-3 items-center  grid grid-cols-[auto_1fr_auto] gap-4 h-full">
        <i className="bx bxs-bar-chart-alt-2 text-3xl"></i>
        <div>
          <h3 className="text-lg">Participation</h3>
          <p className="text-light mt-1 line-clamp-2">
            5 out of 10 members participated in the previous class
          </p>
        </div>
        <p className="bg-highlight text-white h-fit px-2 py-1 rounded-md text-lg">
          50%
        </p>
      </article>
    </div>
  );
}

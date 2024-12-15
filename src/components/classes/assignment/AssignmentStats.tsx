export default function AssignmentStats() {
  return (
    <section className="grid grid-cols-3 gap-8">
      <div className="flex flex-col border-r border-border pr-4">
        <i className="bx bx-upload bg-highlight text-white w-12 text-xl aspect-square rounded-full flex items-center justify-center mb-6"></i>
        <div className="flex-1 text-4xl font-semibold"></div>
        <div className="flex-1 flex flex-col justify-end ">
          <div className="flex gap-1 items-end font-semibold pr-4 mb-2">
            <p className="text-4xl font-semibold">06</p>
            <span className="text-light text-sm mb-1">/10</span>
          </div>
          <p className="text-light">Members have submitted</p>
        </div>
      </div>
      <div className="flex flex-col border-r border-border pr-4">
        <i className="bx bx-upload bg-highlight text-white w-12 text-xl aspect-square rounded-full flex items-center justify-center mb-6"></i>
        <div className="flex-1 flex flex-col justify-end">
          <div className="text-4xl font-semibold pr-4 mb-2">04</div>
          <p className="text-light">Assignments have been graded</p>
        </div>
      </div>
      <div className="flex flex-col">
        <i className="bx bx-upload bg-highlight text-white w-12 text-xl aspect-square rounded-full flex items-center justify-center mb-6"></i>
        <div className="flex-1 flex flex-col justify-end">
          <div className="text-4xl font-semibold pr-4 mb-2">97.5</div>
          <p className="text-light">Average score recieved</p>
        </div>
      </div>
    </section>
  );
}

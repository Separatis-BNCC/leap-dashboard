export default function StatsCardList() {
  return (
    <ul className="grid grid-cols-3 gap-4 col-span-3">
      <li className="bg-white p-3 flex gap-3 rounded-md">
        <div className="bg-bg aspect-square min-h-full flex items-center justify-center rounded-sm">
          <i className="bx bxs-book text-xl text-highlight"></i>
        </div>
        <div>
          <p className="text-light">Current Week</p>
          <h3 className="text-xl font-semibold">5th</h3>
        </div>
      </li>
      <li className="bg-white p-3 flex gap-3 rounded-md">
        <div className="bg-bg aspect-square min-h-full flex items-center justify-center rounded-sm">
          <i className="bx bxs-book text-xl text-highlight"></i>
        </div>
        <div>
          <p className="text-light">Enrolled Members</p>
          <h3 className="text-xl font-semibold">435</h3>
        </div>
      </li>
      <li className="bg-white p-3 flex gap-3 rounded-md">
        <div className="bg-bg aspect-square min-h-full flex items-center justify-center rounded-sm">
          <i className="bx bxs-book text-xl text-highlight"></i>
        </div>
        <div>
          <p className="text-light">Activity</p>
          <h3 className="text-xl font-semibold">Mid Project</h3>
        </div>
      </li>
    </ul>
  );
}

export default function AttendanceRate() {
  return (
    <div className="relative ">
      <article className="bg-gradient-to-bl flex flex-col from-highlight-dark to-highlight-light relative z-[1] h-[97.5%] rounded-md p-5  transition-all duration-200">
        <div className="flex items-center gap-3">
          <i className="bx bx-list-check text-dark text-2xl rounded-full w-[2.5rem] aspect-square flex items-center justify-center  bg-white"></i>
          <p className="text-white">Attendance Rate</p>
        </div>
        <div className="flex-1 flex justify-end flex-col">
          <div className="flex gap-3 items-center">
            <h2 className="text-[2.75rem] leading-[2.75rem] text-white">90%</h2>
            <div className="flex items-center bg-highlight-dark justify-center px-2 rounded-sm">
              <p className="text-white">5%</p>
              <i className="bx bx-up-arrow-alt text-white text-lg"></i>
            </div>
          </div>
          <p className="text-white mt-2">143 Attended Session 14</p>
        </div>
      </article>
      <div className="bg-[#CCD4FF] w-full h-full absolute inset-0 translate-y-[0.75rem] scale-95 transition-all duration-200  rounded-md"></div>
    </div>
  );
}

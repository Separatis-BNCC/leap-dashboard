import ProfilePicture from "../general/ProfilePicture";

export default function ClassSessionDetail() {
  return (
    <div className="bg-white justify-center py-6 px-8 rounded-md flex flex-col max-w-[50rem]">
      <div className="flex items-center gap-4">
        <ProfilePicture />
        <p className="">Jacqueline Audrey I.</p>
      </div>
      <div className="">
        <h2 className="text-3xl font-semibold text-dark mt-3 line-clamp-3 leading-[150%] max-w-[40rem]">
          Object Oriented Approach in Javascript using ES6 Classes.
        </h2>
      </div>
      <div className="flex gap-4 mt-8">
        <div className="flex items-center justify-center border-r-[2px] border-lighter pr-4">
          <i className="bx bx-calendar text-xl mr-3"></i>
          <p>Monday, 25th August 2045</p>
        </div>
        <div className="flex items-center justify-center">
          <i className="bx bx-time-five text-xl mr-3"></i>
          <p>17:20 - 19:00 WIB</p>
        </div>
      </div>
    </div>
  );
}

import { Dispatch } from "react";
import ProfilePicture from "./ProfilePicture";

type Props = {
  setShowSidebar: Dispatch<React.SetStateAction<boolean>>;
};

export default function TopBar({ setShowSidebar }: Props) {
  return (
    <div className="w-full bg-white border-b-[1px] border-slate-200 flex justify-between px-4 py-3 items-center sticky left-0 right-0 top-0 z-10">
      <div className="flex gap-2 items-center">
        <i
          className="bx bx-sidebar text-xl cursor-pointer transition-all duration-200 hover:opacity-50"
          onClick={() => setShowSidebar((cur) => !cur)}
        ></i>
      </div>
      <div className="flex gap-4 items-center">
        <p>Welcome, Admin</p>
        <ProfilePicture />
      </div>
    </div>
  );
}

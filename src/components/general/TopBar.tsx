import { Dispatch } from "react";

type Props = {
  setShowSidebar: Dispatch<React.SetStateAction<boolean>>;
};

export default function TopBar({ setShowSidebar }: Props) {
  return (
    <div className="w-full bg-white flex justify-between px-4 py-3 items-center sticky left-0 right-0 top-0 z-10">
      <div className="flex gap-2 items-center">
        <i
          className="bx bx-sidebar text-xl cursor-pointer transition-all duration-200 hover:opacity-50"
          onClick={() => setShowSidebar((cur) => !cur)}
        ></i>
      </div>
      <div className="flex gap-4 items-center">
        <p>Welcome, Admin</p>
        <img
          className="h-8 object-cover aspect-square rounded-full overflow-hidden"
          src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
    </div>
  );
}

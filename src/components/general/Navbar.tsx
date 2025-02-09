import Logo from "./Logo";
import { cn } from "@/lib/utils";
import NavbarList from "../navbar/NavbarList";

type Props = {
  hidden?: boolean;
};

export default function Navbar({ hidden }: Props) {
  return (
    <>
      <div>{/* Ini buat ngisi grid columnya doang */}</div>
      <ul
        className={cn(
          "w-[15rem] py-4 flex flex-col gap-2 overflow-hidden fixed min-h-screen transition-[width] duration-500 z-10 bg-white border-r-[1px] border-slate-200",
          hidden && "w-0"
        )}
      >
        <div className="flex flex-col gap-1 px-4 flex-1">
          <Logo className="mb-4 ml-4" />
          <NavbarList />
          <div className="flex-1"></div>
          <div className="flex gap-2 items-center ml-4 mb-0 transition-all duration-100 hover:opacity-50 cursor-pointer">
            <i className="bx bx-exit text-xl"></i>
            <p>Logout</p>
          </div>
        </div>
      </ul>
    </>
  );
}

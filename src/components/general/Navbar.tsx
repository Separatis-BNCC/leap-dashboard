import Logo from "./Logo";
import { cn } from "@/lib/utils";
import NavbarList from "../navbar/NavbarList";

type Props = {
  hidden?: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Navbar({ hidden, setShowSidebar }: Props) {
  return (
    <>
      <div>{/* Ini buat ngisi grid columnya doang */}</div>
      <ul
        className={cn(
          "w-[15rem] py-4 flex flex-col gap-2 overflow-hidden fixed min-h-screen transition-[width] duration-500 z-10 bg-white border-r-[1px] border-slate-200",
          hidden && "w-14"
        )}
      >
        <div
          className={cn(
            "flex flex-col gap-1 px-4 flex-1 transition-all duration-500",
            hidden && "p-0 pr-2"
          )}
        >
          <Logo
            className={cn(
              "mb-4 ml-4 transition-all duration-500",
              hidden && "opacity-0"
            )}
          />
          <NavbarList hidden={hidden} setShowSidebar={setShowSidebar} />
          <div className="flex-1"></div>
          <div
            className={cn(
              "flex gap-2 items-center mb-0 transition-all duration-100 hover:opacity-50 cursor-pointer bg-bg border border-border justify-center rounded-md py-1",
              hidden && "gap-0 ml-2"
            )}
          >
            <i className="bx bx-exit text-xl text-light transition-all duration-500 "></i>
            <p
              className={cn(
                "text-light transition-all duration-500",
                hidden && "opacity-0 w-0"
              )}
            >
              Logout
            </p>
          </div>
        </div>
      </ul>
    </>
  );
}

import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { cn } from "@/lib/utils";

const menus = [
  {
    display: "Dashboard",
    route: "/dashboard",
    icon: <i className="bx bxs-grid-alt"></i>,
  },
  {
    display: "Overview",
    route: "/overview",
    icon: <i className="bx bxs-grid-alt"></i>,
  },
  {
    display: "Modules",
    route: "/modules",
    icon: <i className="bx bxs-grid-alt"></i>,
  },
  {
    display: "Schedule",
    route: "/schedule",
    icon: <i className="bx bxs-grid-alt"></i>,
  },
  {
    display: "Master Data",
    route: "/master-data",
    icon: <i className="bx bxs-grid-alt"></i>,
  },
] as const;

type Props = {
  hidden?: boolean;
};

export default function Navbar({ hidden }: Props) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {/* Ini buat ngisi grid columnya doang */}
      <div></div>
      <ul
        className={cn(
          "w-[15rem] py-4 flex flex-col gap-2 overflow-hidden fixed min-h-screen transition-all duration-500",
          hidden && "w-0"
        )}
      >
        <div className="flex flex-col gap-2 px-4 flex-1">
          <Logo className="mb-4 ml-4" />
          {menus.map((menu) => {
            const selected = pathname.includes(menu.route);

            return (
              <li
                key={menu.route}
                className={cn(
                  "flex [&_i]:text-xl relative rounded-sm gap-2 px-4 py-1 items-center justify-start [&>*]:text-light overflow-hidden transition-all duration-100 cursor-pointer hover:opacity-50 whitespace-nowrap",
                  selected && "[&>*]:text-highlight bg-bg "
                )}
                onClick={() => navigate(menu.route)}
              >
                <div
                  className={cn(
                    "absolute h-full bg-highlight w-1 left-0 opacity-0 transition-all duration-100",
                    selected && "opacity-100"
                  )}
                ></div>

                {menu.icon}
                <p>{menu.display}</p>
              </li>
            );
          })}
          <div className="flex-1"></div>
          <div className="flex gap-2 items-center ml-4 mb-0 transition-all duration-100 hover:opacity-50 cursor-pointer">
            <i className="bx bx-exit text-xl"></i>
            <p>Logout</p>
          </div>
        </div>
      </ul>{" "}
    </>
  );
}

import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { cn } from "@/lib/utils";
import RollDown from "../ui/RollDown";

const menus = [
  {
    display: "Dashboard",
    route: "/dashboard",
    icon: <i className="bx bxs-grid-alt"></i>,
  },
  {
    display: "Courses",
    disabled: true,
    route: "/courses",
    icon: <i className="bx bxs-grid-alt"></i>,
    children: [
      {
        display: "Frontend",
        route: "frontend",
      },
      {
        display: "Backend",
        route: "backend",
      },
      {
        display: "Java",
        route: "java",
      },
      {
        display: "UI/UX",
        route: "ui-ux",
      },
      {
        display: "Mobile",
        route: "mobile",
      },
      {
        display: "Flutter",
        route: "flutter",
      },
    ],
  },
  {
    display: "Classes",
    route: "/classes",
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
          "w-[15rem] py-4 flex flex-col gap-2 overflow-hidden fixed min-h-screen transition-[width] duration-500 z-10 bg-white",
          hidden && "w-0"
        )}
      >
        <div className="flex flex-col gap-1 px-4 flex-1">
          <Logo className="mb-4 ml-4" />
          {menus.map((menu) => {
            const selected = pathname === menu.route;
            const shouldRollDown = "children" in menu;

            return (
              <RollDown.Container>
                <RollDown.Trigger
                  disabled={!shouldRollDown}
                  render={(isOpen) => {
                    return (
                      <li
                        key={menu.route}
                        className={cn(
                          "flex [&_i]:text-xl relative rounded-sm gap-2 pl-4 py-1 items-center justify-start [&>*]:text-light overflow-hidden transition-all duration-100 cursor-pointer hover:opacity-50 whitespace-nowrap",
                          selected && "[&>*]:text-highlight bg-bg "
                        )}
                        onClick={() => {
                          if ("disabled" in menu) return;
                          navigate(menu.route);
                        }}
                      >
                        <div
                          className={cn(
                            "absolute h-full bg-highlight w-1 left-0 opacity-0 transition-all duration-100",
                            selected && "opacity-100"
                          )}
                        ></div>

                        {menu.icon}
                        <p className="flex-1">{menu.display}</p>
                        {shouldRollDown && (
                          <div className="px-2 group">
                            <i
                              className={cn(
                                "bx bx-chevron-down transition-all duration-200 group-hover:text-highlight",
                                isOpen && "rotate-180"
                              )}
                            ></i>
                          </div>
                        )}
                      </li>
                    );
                  }}
                ></RollDown.Trigger>
                <RollDown.Content>
                  {"children" in menu &&
                    menu.children.map((child) => {
                      const selected = pathname.includes(child.route);

                      return (
                        <li
                          key={child.display + child.route}
                          className={cn(
                            "flex [&_i]:text-xl relative rounded-sm gap-2 px-4 py-2 items-center justify-start [&>*]:text-light overflow-hidden transition-all duration-100 cursor-pointer hover:opacity-50 whitespace-nowrap ml-5 pl-6",
                            selected && "[&>*]:text-highlight bg-bg "
                          )}
                          onClick={() => navigate("/courses/" + child.route)}
                        >
                          <div
                            className={cn(
                              "absolute h-full bg-highlight w-1 left-0 opacity-0 transition-all duration-100",
                              selected && "opacity-100"
                            )}
                          ></div>

                          <p>{child.display}</p>
                        </li>
                      );
                    })}{" "}
                </RollDown.Content>
              </RollDown.Container>
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

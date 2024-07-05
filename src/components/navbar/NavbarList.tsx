import { useLocation, useNavigate } from "react-router-dom";
import RollDown from "../ui/RollDown";
import { cn } from "@/lib/utils";
import AddCourseNavbar from "../course/AddCourseNavbar";
import NavbarItem from "./NavbarItem";

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

export default function NavbarList() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return menus.map((menu) => {
    const selected = pathname === menu.route;
    const shouldRollDown = "children" in menu;

    const handleNavigate = () => {
      if ("disabled" in menu) return;
      navigate(menu.route);
    };

    return (
      <RollDown.Container>
        <RollDown.Trigger
          disabled={!shouldRollDown}
          render={(isOpen) => {
            return (
              <NavbarItem
                key={menu.display}
                onClick={handleNavigate}
                isSelected={selected}
              >
                {menu.icon}

                <p className="flex-1">{menu.display}</p>
                {shouldRollDown && (
                  <i
                    className={cn(
                      "bx bx-chevron-down transition-all duration-200 group-hover:text-highlight",
                      isOpen && "rotate-180"
                    )}
                  ></i>
                )}
              </NavbarItem>
            );
          }}
        ></RollDown.Trigger>
        <RollDown.Content>
          {shouldRollDown &&
            menu.children.map((child) => {
              const selected = pathname.includes(child.route);
              return (
                <NavbarItem
                  key={child.display}
                  asChild
                  isSelected={selected}
                  onClick={() => navigate("/courses/" + child.route)}
                >
                  <p>{child.display}</p>
                </NavbarItem>
              );
            })}
          {menu.display === "Courses" && <AddCourseNavbar />}
        </RollDown.Content>
      </RollDown.Container>
    );
  });
}

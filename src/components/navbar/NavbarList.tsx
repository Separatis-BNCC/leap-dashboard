import { useLocation, useNavigate } from "react-router-dom";
import NavbarItem from "./NavbarItem";
import NavbarCourse from "./NavbarCourse";
import React from "react";
import { cn } from "@/lib/utils";

const menus = [
  {
    display: "Dashboard",
    route: "/dashboard",
    icon: <i className="bx bxs-grid-alt"></i>,
  },
  // {
  //   display: "Classes",
  //   route: "/classes",
  //   icon: <i className="bx bxs-grid-alt"></i>,
  // },
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

export default function NavbarList({
  hidden,
  setShowSidebar,
}: {
  hidden?: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return menus.map((menu, i) => {
    const selected = pathname === menu.route;

    const handleNavigate = () => {
      if ("disabled" in menu) return;
      navigate(menu.route);
    };

    return (
      <React.Fragment key={menu.display}>
        {i === 1 && (
          <NavbarCourse
            hidden={hidden}
            onClick={() => {
              setShowSidebar(true);
            }}
          />
        )}
        <NavbarItem onClick={handleNavigate} isSelected={selected}>
          {menu.icon}
          <p
            className={cn(
              "flex-1 transition-all duration-500",
              hidden && "opacity-0"
            )}
          >
            {menu.display}
          </p>
        </NavbarItem>
      </React.Fragment>
    );
  });
}

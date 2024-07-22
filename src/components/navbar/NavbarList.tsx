import { useLocation, useNavigate } from "react-router-dom";
import NavbarItem from "./NavbarItem";
import NavbarCourse from "./NavbarCourse";

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

export default function NavbarList() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return menus.map((menu, i) => {
    const selected = pathname === menu.route;

    const handleNavigate = () => {
      if ("disabled" in menu) return;
      navigate(menu.route);
    };

    return (
      <>
        {i === 1 && <NavbarCourse />}
        <NavbarItem
          key={menu.display}
          onClick={handleNavigate}
          isSelected={selected}
        >
          {menu.icon}
          <p className="flex-1">{menu.display}</p>
        </NavbarItem>
      </>
    );
  });
}

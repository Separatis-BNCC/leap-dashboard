import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";

const navigations = [
  {
    title: "Details",
    redirect: "details",
    icon: "bx-task",
  },
  {
    title: "Attendance",
    redirect: "attendance",
    icon: "bx-task",
  },
  {
    title: "Assignment",
    redirect: "assignment",
    icon: "bx-task",
  },
];

export default function ClassNavigation() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <ul className="flex items-center gap-2 justify-center">
      {navigations.map((item) => {
        const isActive = pathname.includes(item.redirect);
        return (
          <li
            key={item.redirect}
            className={cn(
              "rounded-md flex gap-2 items-center justify-center cursor-pointer hover:bg-bg transition-all duration-100 bg-white px-4 py-1",
              isActive
                ? "bg-gradient-to-bl gradient-accent"
                : "border border-border"
            )}
            onClick={() => navigate(`${item.redirect}`)}
          >
            <i
              className={cn(
                "bx text-lg text-dark",
                item.icon,
                isActive && "text-white"
              )}
            ></i>
            <p className={cn("text-dark", isActive && "text-white")}>
              {item.title}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

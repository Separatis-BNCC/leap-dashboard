import { cn } from "@/lib/utils";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const navigations = [
  {
    title: "Details",
    subtitle: "View class general info",
    redirect: "details",
    icon: <i className="bx bx-task"></i>,
  },
  {
    title: "Attendance",
    subtitle: "Manage attendance",
    redirect: "attendance",
    icon: <i className="bx bx-task"></i>,
  },
  {
    title: "Assignment",
    subtitle: "Assignment details",
    redirect: "assignment",
    icon: <i className="bx bx-task"></i>,
  },
];

export default function ClassNavigation() {
  const { pathname } = useLocation();
  const { classId } = useParams();
  const navigate = useNavigate();

  return (
    <nav className="mt-6 gap-6 grid grid-cols-3">
      {navigations.map((nav) => {
        const isActive = pathname.includes(nav.redirect);
        return (
          <div
            key={nav.title}
            className={cn(
              "bg-white flex gap-4 py-6 px-6 border-[1px] border-lighter rounded-md cursor-pointer group transition-all duration-200  hover:translate-y-[-0.25rem]",
              isActive && "bg-highlight border-bg "
            )}
            onClick={() => {
              if (!classId) return;
              navigate(`/classes/${classId}/${nav.redirect}`);
            }}
          >
            <div
              className={cn(
                "[&>i]:text-3xl bg-highlight [&>i]:text-white aspect-square flex items-center justify-center rounded-md",
                isActive && "bg-bg [&>i]:text-highlight"
              )}
            >
              {nav.icon}
            </div>
            <div className="flex-1">
              <h3
                className={cn(
                  "text-xl font-semibold text-dark",
                  isActive && "text-bg"
                )}
              >
                {nav.title}
              </h3>
              <p
                className={cn(
                  "text-light whitespace-nowrap",
                  isActive && "text-lighter"
                )}
              >
                {nav.subtitle}
              </p>
            </div>
            <div className="flex items-center justify-center">
              <i
                className={cn(
                  "bx bx-chevron-right text-2xl border-lighter border-[1px] rounded-full aspect-square w-8 flex items-center justify-center",
                  isActive && "text-bg"
                )}
              ></i>
            </div>
          </div>
        );
      })}
    </nav>
  );
}

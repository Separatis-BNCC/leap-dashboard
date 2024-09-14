import RollDown from "../ui/RollDown";
import { cn, sluggify } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarItem from "./NavbarItem";
import AddCourseNavbar from "../course/AddCourseNavbar";
import Skeleton from "react-loading-skeleton";
import useAllCourseQuery from "@/hooks/course/useAllCourseQuery";
import { HTMLAttributes, useEffect, useState } from "react";

export default function NavbarCourse({
  hidden,
  onClick,
  ...props
}: { hidden?: boolean } & HTMLAttributes<HTMLLIElement>) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { allCourseQuery, allCourseData } = useAllCourseQuery();

  // NOTES : Sebenernya lebih better kalo ga pake useEffect tapi harus passing bnyk data jadi agak pusing nanti
  useEffect(() => {
    if (hidden) {
      setIsOpen(false);
    }
  }, [hidden]);

  if (!allCourseData || allCourseQuery.isLoading) {
    return (
      <div className="px-4">
        <Skeleton height={"20px"} />
      </div>
    );
  }

  return (
    <RollDown.Container open={isOpen} onOpenChange={setIsOpen}>
      <RollDown.Trigger
        render={(isOpen) => {
          return (
            <NavbarItem
              {...props}
              key={"courses-navigation"}
              onClick={(e) => {
                if (onClick) onClick(e);
              }}
            >
              <i className="bx bxs-grid-alt"></i>
              <p
                className={cn(
                  "flex-1 transition-all duration-500",
                  hidden && "opacity-0"
                )}
              >
                Courses
              </p>

              <i
                className={cn(
                  "bx bx-chevron-down transition-all duration-200 group-hover:text-highlight",
                  isOpen && "rotate-180"
                )}
              ></i>
            </NavbarItem>
          );
        }}
      ></RollDown.Trigger>
      <RollDown.Content>
        {allCourseData.map((course) => {
          const courseRoute = `/courses/${sluggify(course.name)}-${course.id}`;
          const selected = pathname === courseRoute;
          return (
            <NavbarItem
              key={course.name + course.id}
              asChild
              isSelected={selected}
              onClick={() => navigate(courseRoute)}
            >
              <p className="truncate">{course.name}</p>
            </NavbarItem>
          );
        })}
        <AddCourseNavbar />
      </RollDown.Content>
    </RollDown.Container>
  );
}

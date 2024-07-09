import useCourseQuery from "@/hooks/course/useCourseQuery";
import RollDown from "../ui/RollDown";
import { cn, sluggify } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarItem from "./NavbarItem";
import AddCourseNavbar from "../course/AddCourseNavbar";
import Skeleton from "react-loading-skeleton";

export default function NavbarCourse() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { coursesData, coursesQuery } = useCourseQuery();

  if (!coursesData || coursesQuery.isLoading) {
    return (
      <div className="px-4">
        <Skeleton height={"20px"} />
      </div>
    );
  }

  return (
    <RollDown.Container>
      <RollDown.Trigger
        render={(isOpen) => {
          return (
            <NavbarItem key={"courses-navigation"}>
              <i className="bx bxs-grid-alt"></i>

              <p className="flex-1">Courses</p>

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
        {coursesData.map((course) => {
          const courseRoute = sluggify(course.name);
          const selected = pathname.includes(courseRoute);
          return (
            <NavbarItem
              key={course.name + course.id}
              asChild
              isSelected={selected}
              onClick={() => navigate("/courses/" + courseRoute)}
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

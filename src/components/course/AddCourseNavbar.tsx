import { useDialog } from "../general/Dialog";
import NavbarItem from "../navbar/NavbarItem";

export default function AddCourseNavbar() {
  const { showDialog } = useDialog();

  return (
    <NavbarItem
      asChild
      className="text-light flex gap-3"
      onClick={() => showDialog("new-course")}
    >
      <div className="w-5 rounded-sm bg-bg text-highlight aspect-square flex items-center justify-center">
        +
      </div>
      <p>Add Course</p>
    </NavbarItem>
  );
}

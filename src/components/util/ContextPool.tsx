import { Outlet } from "react-router-dom";
import { DialogComponents, DialogProvider } from "../general/Dialog";
import EditSession from "../course/EditSession";
import NewCourse from "../course/NewCourse";
import DeleteCourseConfirmation from "../course/DeleteCourseConfirmation";

const dialog: DialogComponents = [
  {
    component: <EditSession />,
    name: "edit-session",
    options: {
      collapseWhenClickOutside: true,
    },
  },
  {
    component: <NewCourse />,
    name: "new-course",
    options: {
      collapseWhenClickOutside: true,
    },
  },
  {
    component: <DeleteCourseConfirmation />,
    name: "delete-course",
    options: {
      collapseWhenClickOutside: true,
    },
  },
];

export default function ContextPool() {
  return (
    <DialogProvider components={dialog}>
      <Outlet />
    </DialogProvider>
  );
}

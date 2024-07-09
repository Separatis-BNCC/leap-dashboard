import { Outlet } from "react-router-dom";
import { DialogComponents, DialogProvider } from "../general/Dialog";
import EditSession from "../course/EditSession";
import AddCourse from "../course/AddCourse";
import DeleteCourseConfirmation from "../course/DeleteCourseConfirmation";
import ToastProvider from "../ui/Toaster";
import AddSession from "../course/AddSession";
import AddClass from "../classes/AddClass";

const dialog: DialogComponents = [
  {
    component: <EditSession />,
    name: "edit-session",
    options: {
      collapseWhenClickOutside: true,
    },
  },
  {
    component: <AddCourse />,
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
  {
    component: <AddSession />,
    name: "add-session",
    options: {
      collapseWhenClickOutside: true,
    },
  },
  {
    component: <AddClass />,
    name: "add-class",
    options: {
      collapseWhenClickOutside: true,
    },
  },
];

export default function ContextPool() {
  return (
    <ToastProvider suspendDuration={4000}>
      <DialogProvider components={dialog}>
        <Outlet />
      </DialogProvider>
    </ToastProvider>
  );
}

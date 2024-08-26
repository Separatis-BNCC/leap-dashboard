import { Outlet } from "react-router-dom";
import { DialogComponents, DialogProvider } from "../general/Dialog";
import EditSession from "../course/EditSession";
import AddCourse from "../course/AddCourse";
import DeleteCourseConfirmation from "../course/DeleteCourseConfirmation";
import ToastProvider from "../ui/Toaster";
import AddSession from "../course/AddSession";
import AddClass from "../classes/AddClass";
import AssignPraeto from "../classes/AssignPraeto";
import AssignMember from "../classes/AssignMember";
import { SkeletonTheme } from "react-loading-skeleton";
import { UserTableProvider } from "@/context/UserTableContext";
import DeleteConfirmation from "../general/DeleteConfirmation";
import MaterialDetail from "../material/MaterialDialog";
import AttendanceProofDialog from "../classes/attendance/AttendanceProofDialog";

const dialog: DialogComponents = [
  {
    component: <EditSession />,
    name: "edit-session",
  },
  {
    component: <AddCourse />,
    name: "new-course",
  },
  {
    component: <DeleteCourseConfirmation />,
    name: "delete-course",
  },
  {
    component: <DeleteConfirmation />,
    name: "delete-confirmation",
  },
  {
    component: <AddSession />,
    name: "add-session",
  },
  {
    component: <AddClass />,
    name: "add-class",
  },
  {
    component: <AssignPraeto />,
    name: "assign-praeto",
  },
  {
    component: <AssignMember />,
    name: "assign-member",
  },
  {
    component: <MaterialDetail />,
    name: "material-detail",
  },
  {
    component: <AttendanceProofDialog />,
    name: "attendance-proof",
  },
];

export default function ContextPool() {
  return (
    <ToastProvider suspendDuration={4000}>
      <UserTableProvider>
        <DialogProvider components={dialog}>
          <SkeletonTheme
            baseColor="rgb(228, 234, 247)"
            highlightColor="rgb(245, 248, 255)"
          >
            <Outlet />
          </SkeletonTheme>
        </DialogProvider>
      </UserTableProvider>
    </ToastProvider>
  );
}

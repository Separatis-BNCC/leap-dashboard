import { Outlet } from "react-router-dom";
import { DialogComponents, DialogProvider } from "../general/Dialog";
import EditSession from "../course/EditSession";

const dialog: DialogComponents = [
  {
    component: <EditSession />,
    name: "edit-session",
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

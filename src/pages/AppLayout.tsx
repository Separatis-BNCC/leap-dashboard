import Navbar from "@/components/general/Navbar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

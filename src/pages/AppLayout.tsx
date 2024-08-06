import { useDialog } from "@/components/general/Dialog";
import Navbar from "@/components/general/Navbar";
import TopBar from "@/components/general/TopBar";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  const [showSidebar, setShowSidebar] = useState(true);
  const { showDialog } = useDialog();

  useEffect(() => {
    showDialog("material-detail");
  }, []);

  return (
    <div
      className={cn(
        "grid transition-all duration-500",
        showSidebar ? "grid-cols-[15rem_4fr]" : "grid-cols-[0rem_1fr]"
      )}
    >
      <Navbar hidden={!showSidebar} />
      <main className="bg-bg min-h-screen w-full relative min-w-0 flex flex-col">
        <TopBar setShowSidebar={setShowSidebar} />
        <Outlet />
      </main>
    </div>
  );
}

import Navbar from "@/components/general/Navbar";
import TopBar from "@/components/general/TopBar";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div
      className={cn(
        "grid transition-[grid-template-columns] duration-500 min-h-screen",
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

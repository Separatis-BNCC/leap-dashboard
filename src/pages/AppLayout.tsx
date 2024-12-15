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
        showSidebar ? "grid-cols-[15rem_4fr]" : "grid-cols-[3.5rem_1fr]"
      )}
    >
      <Navbar hidden={!showSidebar} setShowSidebar={setShowSidebar} />
      <main className="bg-bg w-full min-h-screen relative min-w-0 flex flex-col">
        <TopBar setShowSidebar={setShowSidebar} />
        <div className="overflow-auto flex-1 w-full">
          <div className="h-0 min-h-full flex flex-col flex-1 [&>*]:flex-1">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

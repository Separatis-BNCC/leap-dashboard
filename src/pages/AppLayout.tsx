import Navbar from "@/components/general/Navbar";
import { ScrollArea } from "@/components/general/ScrollArea";
import TopBar from "@/components/general/TopBar";
import { cn } from "@/lib/utils";
import { Scroll } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SwiperSlide } from "swiper/react";
import { Swiper } from "swiper/react";

export default function AppLayout() {
  const [showSidebar, setShowSidebar] = useState(true);

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

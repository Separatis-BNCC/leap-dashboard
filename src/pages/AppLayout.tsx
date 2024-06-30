import Navbar from "@/components/general/Navbar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="grid grid-cols-[auto_1fr]">
      <Navbar />
      <main className="bg-bg min-h-screen w-full">
        <div className="w-full bg-white flex justify-between px-4 py-2 items-center">
          <p>Welcome, Admin</p>
          <div>
            <img
              className="h-8 object-cover aspect-square rounded-full overflow-hidden"
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
}

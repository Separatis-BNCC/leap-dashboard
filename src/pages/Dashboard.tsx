import AllClasses from "@/components/dashboard/AllClasses";
import CurrentAgenda from "@/components/dashboard/CurrentAgenda";
import OverallProgress from "@/components/dashboard/OverallProgress";
import TotalMembers from "@/components/dashboard/TotalMembers";

export default function Dashboard() {
  return (
    <section className="p-8 flex flex-col h-full">
      <h1 className="text-dark font-semibold text-3xl mb-1">Dashboard</h1>
      <p className="text-light mb-5">Regular Class Analytic Details</p>
      <div className="grid grid-cols-2 gap-4">
        <TotalMembers />
        <CurrentAgenda />
      </div>
      <div className="grid grid-cols-[5fr_3fr] mt-4 flex-1 gap-4  w-full h-full">
        <AllClasses />
        <OverallProgress />
      </div>
    </section>
  );
}

import AttendanceSessions from "./AttendanceSessions";
import AttendanceTable from "./AttendanceTable";

// nanti ini get session by id (idnya ada di class)
export default function Attendance() {
  return (
    <section className="flex flex-col gap-4 flex-1">
      <AttendanceSessions />
      <AttendanceTable />
    </section>
  );
}

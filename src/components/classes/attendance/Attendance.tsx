import { ScrollArea } from "@/components/general/ScrollArea";

export default function Attendance() {
  const gridTemplateColumns = "2rem repeat(5,minmax(16rem,1fr)";

  return (
    <section className="bg-white border border-border rounded-md min-w-0">
      <ul
        className="grid sticky left-0 top-[3.375rem] py-6 right-0"
        style={{
          gridTemplateColumns,
        }}
      >
        <li></li>
        <li>Name</li>
        <li>Role</li>
        <li>Status</li>
        <li>Notes</li>
        <li></li>
      </ul>
      <ul
        className="grid h-[100rem]"
        style={{
          gridTemplateColumns,
        }}
      >
        <li></li>
      </ul>
    </section>
  );
}

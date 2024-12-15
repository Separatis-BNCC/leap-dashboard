import { useState } from "react";
import ClassMiscNavigation from "./ClassMiscNavigation";
import ClassMiscStatistics from "./ClassMiscStatistics";
import ClassMiscReplacementClass from "./ClassMiscReplacementClass";

export default function ClassMisc() {
  const [page, setPage] = useState<"Replacement Class" | "Statistics">(
    "Statistics"
  );

  return (
    <article className="border border-border px-5 py-4 bg-white rounded-md flex flex-col">
      <ClassMiscNavigation page={page} setPage={setPage} />
      {page === "Replacement Class" && <ClassMiscReplacementClass />}
      {page === "Statistics" && <ClassMiscStatistics />}
    </article>
  );
}

import { Classes } from "@/lib/types";
import Skeleton from "react-loading-skeleton";

export default function UpcomingClassCountdown({
  classData,
}: {
  classData?: Classes;
}) {
  if (!classData)
    return (
      <Skeleton
        className="mt-6 px-6 py-1 !rounded-full"
        width={"10rem"}
        height={"1.75rem"}
      />
    );

  return (
    <div className="bg-bg rounded-full mt-6 px-6 py-1 text-light">
      Next Class in 05:34:20
    </div>
  );
}

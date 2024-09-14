import Badge from "@/components/general/Badge";

const statusMap = ["Attended", "Not Verified", "Permitted", "Absent"] as const;
export function getAttendanceStatus(status?: number) {
  if (!status) return undefined;
  if (status - 1 > statusMap.length - 1) return undefined;
  return statusMap[status - 1];
}

const colorMap = {
  Attended: "green",
  Permitted: "purple",
  Absent: "red",
  "Not Verified": "gray",
} as const;

type Props = {
  status: number;
};

export default function AttendanceStatusPopover({ status }: Props) {
  const statusType = getAttendanceStatus(status);
  if (!statusType) return;
  return (
    <div className="flex gap-4">
      <i className="bx bx-chevron-down w-6 h-6 aspect-square rounded-full border-border border bg-bg text-dark flex items-center justify-center text-lg"></i>
      <Badge variant={colorMap[statusType]}>{statusType}</Badge>
    </div>
  );
}

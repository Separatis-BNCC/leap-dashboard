import Badge from "@/components/general/Badge";
import { Popover, PopoverContent } from "@/components/ui/Popover";
import { useToast } from "@/components/ui/Toaster";
import { cn } from "@/lib/utils";
import { API } from "@/service/API";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const statuses = ["Attended", "Not Verified", "Permitted", "Absent"] as const;
export function getAttendanceStatus(status?: number) {
  if (!status) return undefined;
  if (status - 1 > statuses.length - 1) return undefined;
  return statuses[status - 1];
}

const colorMap = {
  Attended: "green",
  Permitted: "purple",
  Absent: "red",
  "Not Verified": "gray",
} as const;

const colors = {
  Attended: "bg-green-500",
  Permitted: "bg-purple-500",
  Absent: "bg-red-500",
  "Not Verified": "bg-slate-500",
} as const;

type Props = {
  status: number;
};

type Statuses = (typeof statuses)[number];

export default function AttendanceStatusPopover({ status }: Props) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<Statuses | undefined>();

  useEffect(() => {
    const statusType = getAttendanceStatus(status);
    if (statusType) setCurrentStatus(statusType);
  }, [status]);

  const statusMutation = useMutation({
    mutationFn: (newStatus: Statuses) => {
      // TAR GANTI END POINT NYA
      return API.post("/login", {
        email: "Spofksdf",
        password: "spofdksdpof",
      });
    },
    onMutate: (newStatus: Statuses) => {
      const prev = currentStatus;
      setCurrentStatus(newStatus);
      setOpen(false);
      return prev;
    },
    onSuccess: () => {},
    onError: (_, __, prev) => {
      toast.error("Couldn't update attedance status");
      setCurrentStatus(prev);
    },
  });

  if (!currentStatus) return "-";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="flex gap-4 attendance-popover w-fit hover:opacity-60 transition-all duration-150 cursor-pointer">
        <i className="bx bx-chevron-down w-6 h-6 aspect-square rounded-full border-border border bg-bg text-dark flex items-center justify-center text-lg"></i>
        <Badge variant={colorMap[currentStatus]}>{currentStatus}</Badge>
      </PopoverTrigger>
      <PopoverContent className="p-2 attendance-popover">
        {statuses.map((status) => {
          const isSelected = currentStatus === status;
          return (
            <div
              className={cn(
                "py-2 px-2 rounded-md flex items-center transition-all duration-100 cursor-pointer gap-3 text-light",
                isSelected ? "bg-bg text-dark" : "hover:bg-bg/50"
              )}
              onClick={() => statusMutation.mutate(status)}
            >
              <div
                className={cn(
                  "w-[0.375rem] h-[0.375rem] bg-light rounded-full",
                  colors[status]
                )}
              ></div>
              {status}
            </div>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}

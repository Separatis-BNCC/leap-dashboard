import DayPicker from "@/components/general/DayPicker";
import TimePickerLegacy from "@/components/general/TimePickerLegacy";
import { Button } from "@/components/ui/Button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/Popover";
import useClassMutation from "@/hooks/class/useClassMutation";
import { Classes } from "@/lib/types";
import { cn, days } from "@/lib/utils";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type ScheduleFields = {
  day_of_week?: number;
  start_time: string;
};

function mergeDate(hour?: number, minute?: number) {
  if (typeof hour === "number" && typeof minute === "number") {
    return `${hour}:${minute}`;
  }
  return undefined;
}

export default function ClassSchedulePicker({
  classData,
  className,
}: {
  classData?: Classes;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { updateMutation } = useClassMutation();

  const { handleSubmit, control } = useForm<ScheduleFields>({
    values: {
      day_of_week: classData?.day_of_week
        ? Number(classData?.day_of_week)
        : undefined,
      start_time: mergeDate(classData?.hour, classData?.minute) || "",
    },
  });

  const onSubmit: SubmitHandler<ScheduleFields> = (value) => {
    const [hour, minute] = value.start_time.split(":");

    updateMutation.mutate(
      {
        classId: Number(classData?.id),
        data: {
          day_of_week: value.day_of_week,
          hour: +hour,
          minute: +minute,
        },
      },
      {
        onSuccess: () => setIsOpen(false),
      }
    );
  };

  return (
    <Popover onOpenChange={setIsOpen} open={isOpen}>
      <PopoverTrigger
        className={cn(
          "w-full flex items-center hover:bg-bg transition-all duration-100 cursor-pointer justify-center px-8 py-2 text-light rounded-md border border-border max-w-[15rem]",
          className
        )}
      >
        <i className="bx bx-calendar text-light text-xl mr-2"></i>
        Set Schedule
      </PopoverTrigger>
      <PopoverContent className="bg-white border boder-border p-0 py-3  rounded-md shadow-[0_8px_34.1px_0] shadow-[#D1D6FD] w-fit">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="pb-3 flex gap-2 items-center text-dark border-border border-b px-6">
            <i className="bx bx-time text-xl text-dark"></i>
            Set Class Schedule
          </div>
          <div className="px-6 pt-6 pb-2">
            <p className="text-dark mb-3">Select Day</p>
            <Controller
              control={control}
              name="day_of_week"
              render={({ field: { onChange, value } }) => {
                return (
                  <DayPicker
                    className="mb-4"
                    onSelect={(_, val) => onChange(val)}
                    value={typeof value === "number" ? days[value] : undefined}
                  />
                );
              }}
            />
            <div className="grid grid-cols-[1fr_1rem_1fr] place-items-center gap-4">
              <Controller
                control={control}
                name="start_time"
                render={({ field: { onChange, value } }) => {
                  const [hour, minute] = value.split(":");

                  return (
                    // Combines hours and minutes into "hours:minute"
                    <TimePickerLegacy
                      onChange={(value) => {
                        onChange(mergeDate(value.hours, value.minutes) || "");
                      }}
                      value={{
                        hours: hour ? Number(hour) : 0,
                        minutes: minute ? Number(minute) : 0,
                      }}
                    />
                  );
                }}
              />
              <div className="w-full h-[2px] bg-border mt-6"></div>
              <TimePickerLegacy />
            </div>
            <div className="mt-6 flex justify-end">
              <Button
                variant={"accent"}
                className="px-6"
                isLoading={updateMutation.isPending}
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}

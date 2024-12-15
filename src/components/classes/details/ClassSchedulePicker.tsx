import DayPicker from "@/components/general/DayPicker";
import TimePickerLegacy from "@/components/general/TimePickerLegacy";
import { Button } from "@/components/ui/Button";
import { Popover, PopoverContent } from "@/components/ui/Popover";
import TimePicker from "@/components/ui/TimePicker";
import useClassMutation from "@/hooks/class/useClassMutation";
import { Classes } from "@/lib/types";
import { days } from "@/lib/utils";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { ReactNode, useState } from "react";
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
  triggerElement,
}: {
  classData?: Classes;
  triggerElement: ReactNode;
  open?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { updateMutation } = useClassMutation();

  const { handleSubmit, control } = useForm<ScheduleFields>({
    values: {
      day_of_week:
        typeof classData?.day_of_week === "number"
          ? classData?.day_of_week
          : undefined,
      start_time: mergeDate(classData?.hour, classData?.minute) || "0:0",
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
      <PopoverTrigger asChild>{triggerElement}</PopoverTrigger>
      <PopoverContent className="bg-white border boder-border p-0 py-3  rounded-md shadow-[0_8px_34.1px_0] shadow-[#D1D6FD] max-w-[22.5rem] w-full">
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
                  return (
                    <TimePicker
                      onChange={(value) => {
                        onChange(value.join(":"));
                      }}
                      value={value.split(":").map(Number)}
                    />
                  );
                }}
              />
              <div className="w-full h-[2px] bg-border mt-6"></div>
              <TimePicker />
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

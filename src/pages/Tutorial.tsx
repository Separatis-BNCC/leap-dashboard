import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  name: string;
  region: string;
};

export const faculty = [
  "School of Computer Science",
  "Scoll of Information System",
  "School of Design",
  "BINUS Business School Undergraduate Programs",
  "School of Accounting",
  "Faculty of Digital Communication and Hotel & Tourism",
  "Faculty of Humanities",
  "Faculty of Engineering",
  "Double Programs",
  "Master Track Programs",
] as const;

export default function Tutorial() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // 1. Ambil control
    control,
  } = useForm<FormValues>({
    values: {
      name: "",
      region: "Master Track Programs",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (value) => {
    console.log("SENDING TO BACKED");
    const formattedData = {
      ...value,
      region: faculty.findIndex((item) => item === value.region),
    };
    console.log(formattedData);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[600px] grid place-items-center mx-auto"
    >
      <Input
        label="test"
        {...register("name", { required: "This field can't be empty" })}
        type="text"
        placeholder="test"
        errorMessage={errors.name?.message}
      />
      <Controller
        control={control}
        name="region"
        render={({ field: { onChange, value } }) => {
          return <Dropdown onChange={onChange} value={value} />;
        }}
      />
      <Button className="mt-8">Submit</Button>
    </form>
  );
}

type Props = {
  onChange: (value: string) => void;
  value: string;
};

function Dropdown({ onChange, value }: Props) {
  const [selected, setSelected] = useState("");

  const usedValue = typeof value === "undefined" ? selected : value;
  return (
    <Popover>
      <PopoverTrigger className="border-border border rounded-md ">
        {usedValue || "Region"}
      </PopoverTrigger>
      <PopoverContent>
        {faculty.map((data) => {
          return (
            <div
              onClick={() => {
                setSelected(data);
                onChange(data);
              }}
              className={cn(
                "mt-4 transition-all duration-200",
                usedValue === data && "bg-slate-100 "
              )}
            >
              {data}
            </div>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}

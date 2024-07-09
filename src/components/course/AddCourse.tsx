import { useDialog } from "../general/Dialog";
import { Button } from "../ui/Button";
import Input from "../ui/Input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import RegionPopover from "../general/RegionPopover";
import { cn } from "@/lib/utils";
import useCourseMutation from "@/hooks/course/useCourseMutation";

type CourseFields = {
  name: string;
  region: number;
};

export default function AddCourse() {
  const { createMutation } = useCourseMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CourseFields>();
  const { closeDialog } = useDialog();

  const onSubmit: SubmitHandler<CourseFields> = (value) => {
    createMutation.mutate(value, {
      onSuccess() {
        closeDialog();
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white w-full max-w-[40rem] py-8 px-10 rounded-md"
    >
      <h2 className="text-2xl text-dark font-semibold mb-2">Add Course</h2>
      <p className="text-light border-b-[1px] border-lighter pb-4 mb-8">
        Create a new course which will be available globally
      </p>
      <Input
        placeholder="Microservice with Golang"
        label="Name"
        className="mb-6"
        {...register("name", { required: "This field can't be empty" })}
        errorMessage={errors.name?.message}
      />
      <p className="text-dark mb-2">Region</p>
      <Controller
        control={control}
        name="region"
        rules={{ required: "This field can't be empty" }}
        render={({ field: { onChange, value } }) => {
          return (
            <RegionPopover
              className={cn(errors.region && "border-red-400")}
              onSelect={(_, data) => onChange(data)}
              defaultValue={value}
            />
          );
        }}
      />
      {errors.region && (
        <div className="flex gap-2 items-center mt-2">
          <i className="text-red-400 bx bxs-error-circle leading-[150%]"></i>
          <p className="text-red-400 leading-[150%]">{errors.region.message}</p>
        </div>
      )}

      <div className="flex items-center justify-end gap-2 mt-16">
        <div className="grid grid-cols-2 gap-4 [&>button]:px-6">
          <Button variant={"secondary"} onClick={() => closeDialog()}>
            Cancel
          </Button>
          <Button
            variant={"accent"}
            isLoading={createMutation.isPending}
            disabled={createMutation.isPending}
          >
            Create
          </Button>
        </div>
      </div>
    </form>
  );
}

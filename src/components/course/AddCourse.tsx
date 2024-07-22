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
  session: number;
};

export default function AddCourse() {
  const { createMutation } = useCourseMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CourseFields>({
    defaultValues: {
      session: 13,
    },
  });
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
      className="bg-white w-full max-w-[35rem] py-6 rounded-md border-[1px] border-slate-200"
    >
      <div className="border-b-[1px] border-slate-200 px-8 pb-4 mb-8">
        <h2 className="text-2xl text-dark font-semibold mb-2">Create Course</h2>
        <p className="text-light">
          Create a new course which will be available globally
        </p>
      </div>
      <div className="px-8">
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
                className={cn("mb-6", errors.region && "border-red-400")}
                onSelect={(_, data) => onChange(data)}
                defaultValue={value}
              />
            );
          }}
        />
        <Input
          placeholder="13"
          label="How Many Sessions?"
          className="mb-6"
          {...register("session", { required: "This field can't be empty" })}
          errorMessage={errors.session?.message}
        />
        {errors.region && (
          <div className="flex gap-2 items-center mt-2">
            <i className="text-red-400 bx bxs-error-circle leading-[150%]"></i>
            <p className="text-red-400 leading-[150%]">
              {errors.region.message}
            </p>
          </div>
        )}
        <div className="bg-highlight/10 text-highlight px-4 py-3 rounded-md flex items-center gap-2">
          <i className="bx bxs-error-circle text-highlight mr-2 text-lg"></i>
          <p className="text-highlight">
            Once you have set the session field, it
            <span className="ml-1 text-highlight font-semibold">
              can not be updated.
            </span>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 mt-8 border-t-[1px] pt-6 border-slate-200 px-8 ">
        <div className="grid grid-cols-2 gap-4 [&>button]:px-6">
          <Button
            variant={"secondary"}
            onClick={() => closeDialog()}
            disabled={createMutation.isPending}
          >
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

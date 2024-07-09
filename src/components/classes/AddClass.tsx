import { SubmitHandler, useForm } from "react-hook-form";
import { useDialog } from "../general/Dialog";
import { Button } from "../ui/Button";
import Input from "../ui/Input";
import useClassMutation from "@/hooks/class/useClassMutation";

type ClassFields = {
  name: string;
};

export default function AddClass() {
  const { createMutation } = useClassMutation();
  const { contextData, closeDialog } = useDialog();
  const courseId = contextData as number;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClassFields>({});

  const onSubmit: SubmitHandler<ClassFields> = (value) => {
    createMutation.mutate(
      {
        name: value.name,
        course_id: courseId,
      },
      { onSuccess: () => closeDialog() }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white w-full max-w-[40rem] py-8 px-10 rounded-md"
    >
      <h2 className="text-2xl text-dark font-semibold mb-2">Create Class</h2>
      <p className="text-light border-b-[1px] border-lighter pb-4 mb-8">
        Create a new class for this course
      </p>
      <Input
        placeholder="FE - A"
        label="Name"
        className="mb-6"
        {...register("name", { required: "This field can't be empty" })}
        errorMessage={errors.name?.message}
      />

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
            Save
          </Button>
        </div>
      </div>
    </form>
  );
}

import { SubmitHandler, useForm } from "react-hook-form";
import { useDialog } from "../general/Dialog";
import { Button } from "../ui/Button";
import Input from "../ui/Input";
import UseSessionMutation from "@/hooks/session/useSessionMutation";

type SessionFields = {
  description: string;
  week: number;
};

export default function AddSession() {
  const { createMutation } = UseSessionMutation();
  const { contextData, closeDialog } = useDialog();
  const courseId = contextData as number;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SessionFields>({});

  const onSubmit: SubmitHandler<SessionFields> = (value) => {
    createMutation.mutate({
      description: value.description,
      week: value.week,
      course_id: courseId,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white w-full max-w-[40rem] py-8 px-10 rounded-md"
    >
      <h2 className="text-2xl text-dark font-semibold mb-2">Create Session</h2>
      <p className="text-light border-b-[1px] border-lighter pb-4 mb-8">
        Create a new session which will be available globally
      </p>
      <Input
        placeholder="Introduction to Object Oriented Programming"
        label="Title"
        className="mb-6"
        {...register("description", { required: "This field can't be empty" })}
        errorMessage={errors.description?.message}
      />

      <Input
        placeholder="4"
        label="Week"
        className="mb-6"
        {...register("week", {
          required: "This field can't be empty",
          valueAsNumber: true,
        })}
        errorMessage={errors.week?.message}
      />

      {/* <DatePicker label="Schedule Date" className="mb-6" /> */}
      <p className="mb-2">Notes</p>
      <textarea
        className="px-6 py-4 border-[1px] border-bg resize-none w-full rounded-md h-[8.75rem]"
        placeholder="Description..."
      ></textarea>
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

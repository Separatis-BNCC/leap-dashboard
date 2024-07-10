import { SubmitHandler, useForm } from "react-hook-form";
import { useDialog } from "../general/Dialog";
import { Button } from "../ui/Button";
import Input from "../ui/Input";
import { Session } from "@/lib/types";
import UseSessionMutation from "@/hooks/session/useSessionMutation";
import { LoadingSpinner } from "../ui/LoadingSpinner";

type SessionFields = {
  description: string;
  notes: string;
};

export default function EditSession() {
  const { updateMutation, deleteMutation } = UseSessionMutation();
  const { contextData, closeDialog } = useDialog();
  const sessionData = contextData as Session;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SessionFields>({
    defaultValues: {
      description: sessionData.description,
    },
  });

  const onSubmit: SubmitHandler<SessionFields> = (value) => {
    updateMutation.mutate({
      id: sessionData.id,
      description: value.description,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white w-full max-w-[40rem] py-8 px-10 rounded-md"
    >
      <div className="flex gap-3 items-center mb-3">
        <h2 className="text-2xl text-dark font-semibold leading-[100%]">
          Edit Session
        </h2>
        {deleteMutation.isPending ? (
          <LoadingSpinner />
        ) : (
          <i
            className="bx bx-trash text-xl leading-[100%] text-red-400 hover:text-red-500 cursor-pointer transition-all duration-100 translate-y-[-1px]"
            onClick={() => deleteMutation.mutate(sessionData.id)}
          ></i>
        )}
      </div>
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

      {/* <DatePicker label="Schedule Date" className="mb-6" /> */}
      <p className="mb-2">Notes</p>
      <textarea
        className="px-6 py-4 border-[1px] border-bg resize-none w-full rounded-md h-[8.75rem]"
        placeholder="Description..."
      ></textarea>
      <div className="flex items-center justify-end gap-2 mt-16">
        <div className="grid grid-cols-2 gap-4 [&>button]:px-6">
          <Button
            variant={"secondary"}
            onClick={() => closeDialog()}
            disabled={updateMutation.isPending || deleteMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            variant={"accent"}
            isLoading={updateMutation.isPending}
            disabled={updateMutation.isPending || deleteMutation.isPending}
          >
            Save
          </Button>
        </div>
      </div>
    </form>
  );
}

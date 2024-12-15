import useContentMutation from "@/hooks/content/useContentMutation";
import { Button } from "../ui/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../ui/Input";
import { cn } from "@/lib/utils";
import { Session } from "@/lib/types";

type Fields = {
  desc: string;
  url: string;
};

export default function ContentInput({
  sessionId,
  content,
  onSuccessfulMutation,
}: {
  sessionId?: number;
  content?: Session["contents"][number];
  onSuccessfulMutation: () => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Fields>({
    values: {
      desc: content?.desc || "",
      url: content?.url || "",
    },
  });
  const { addMutation, updateMutation } = useContentMutation();

  const onSubmit: SubmitHandler<Fields> = async (value) => {
    if (!sessionId) return;
    const newContent = {
      desc: value.desc,
      url: value.url || "url",
      content_type: "link",
      session_id: sessionId,
    };

    // If content.id exists that means this element is currently updating a previously created content.
    if (content?.id) {
      await updateMutation.mutateAsync({
        contentId: content.id,
        data: newContent,
      });
    } else {
      await addMutation.mutateAsync(newContent);
      reset();
    }

    // notify parent component to remove selected id.
    onSuccessfulMutation();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="items-center grid grid-cols-[1fr_auto] mt-4 gap-4"
    >
      <div className="col-span-2">
        <textarea
          {...register("desc", { required: "This field can't be empty" })}
          className={cn(
            "resize-none border border-border rounded-md h-30 w-full h-32 p-4",
            errors.desc && "border-red-500"
          )}
          placeholder="Outline Here..."
        ></textarea>
        {errors.desc?.message && (
          <div className="flex gap-2 items-center mt-2">
            <i className="text-red-400 bx bxs-error-circle leading-[150%]"></i>
            <p className="text-red-400 leading-[150%]">
              {errors.desc?.message}
            </p>
          </div>
        )}
      </div>
      <div className="relative">
        <i className="bx bx-link absolute left-4 text-lg text-light leading-[100%] top-[50%] translate-y-[-50%]"></i>
        <Input
          {...register("url")}
          placeholder="Your link here..."
          inputClassName="pl-11"
          errorMessage={errors.url?.message}
        />
      </div>
      <Button
        className="h-full px-10"
        variant={"accent"}
        isLoading={addMutation.isPending || updateMutation.isPending}
      >
        Create
      </Button>
    </form>
  );
}

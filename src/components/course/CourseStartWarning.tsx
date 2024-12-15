import { useMutation } from "@tanstack/react-query";
import { useDialog } from "../general/Dialog";
import { Button } from "../ui/Button";
import { API } from "@/service/API";
import { useToast } from "../ui/Toaster";

export default function CourseStartWarning() {
  const { toast } = useToast();
  const { closeDialog, contextData: courseId } = useDialog<number>();

  const startMutation = useMutation({
    mutationFn: (courseId: number) => API.put(`/courses/status/${courseId}`),
    onSuccess: () => {
      closeDialog();
    },
    onError: () => {
      toast.error("Oops, Something went wrong!");
    },
  });

  return (
    <div className="max-w-[27.5rem] bg-white border border-border rounded-md p-8 text-center">
      <i className="bx bx-error-circle text-[5rem] mb-4 text"></i>
      <h2 className="text-xl font-semibold mb-2">
        You Are About To Start This Course
      </h2>
      <p className="mb-6 text-light">
        you will no longer be able to modify classes and outlines. This action
        can not be reverted.
      </p>
      <div className="grid grid-cols-2 gap-4">
        <Button variant={"secondary"} onClick={() => closeDialog()}>
          Cancel
        </Button>
        <Button
          variant={"accent"}
          isLoading={startMutation.isPending}
          onClick={() => startMutation.mutate(courseId)}
        >
          Start
        </Button>
      </div>
    </div>
  );
}

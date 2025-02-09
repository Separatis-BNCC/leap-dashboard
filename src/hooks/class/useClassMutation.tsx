import { useDialog } from "@/components/general/Dialog";
import { useToast } from "@/components/ui/Toaster";
import { API } from "@/service/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useClassMutation() {
  const queryClient = useQueryClient();
  const { closeDialog } = useDialog();
  const { toast } = useToast();
  const createMutation = useMutation({
    mutationFn(data: { course_id: number; name: string }) {
      return API.post("/classes", data);
    },
    onSuccess() {
      toast.success("Successfuly created a new class");
      queryClient.invalidateQueries({ queryKey: ["course"] });
    },
    onError() {
      toast.error("Oops, something went wrong!");
    },
  });

  const deleteMutation = useMutation({
    mutationFn(classId: number) {
      return API.delete(`/classes/${classId}`);
    },
    onSuccess() {
      toast.success("Successfuly delete class");
      queryClient.invalidateQueries({ queryKey: ["course"] });
      closeDialog();
    },
    onError() {
      toast.error("Oops, something went wrong!");
    },
  });

  return { createMutation, deleteMutation };
}

import { useDialog } from "@/components/general/Dialog";
import { useToast } from "@/components/ui/Toaster";
import { Session } from "@/lib/types";
import { API } from "@/service/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function UseSessionMutation() {
  const { toast } = useToast();
  const { closeDialog } = useDialog();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: number) => API.delete(`/sessions/${id}`),
    onSuccess() {
      toast.success("Successfuly Deleted Session");
      queryClient.invalidateQueries({ queryKey: ["course"] });
      closeDialog();
    },
    onError() {
      toast.error("Oops! Something went wrong");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: Partial<Session> & { id: number }) =>
      API.put(`/sessions/${data.id}`, data),
    onSuccess() {
      toast.success("Successfuly Edited Session");
      queryClient.invalidateQueries({ queryKey: ["course"] });
      closeDialog();
    },
    onError() {
      toast.error("Oops! Something went wrong");
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: {
      course_id: number;
      description: string;
      week: number;
    }) => API.post(`/sessions`, data),
    onSuccess() {
      toast.success("Successfuly Created Session");
      closeDialog();
      queryClient.invalidateQueries({ queryKey: ["course"] });
    },
    onError() {
      toast.error("Oops! Something went wrong");
    },
  });

  return { updateMutation, createMutation, deleteMutation };
}

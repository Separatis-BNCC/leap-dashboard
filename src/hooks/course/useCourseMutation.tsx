import { useToast } from "@/components/ui/Toaster";
import { API } from "@/service/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCourseMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn(data: { name: string; region: number }) {
      return API.post("/courses", data);
    },
    onSuccess() {
      toast.success("Successfuly created a new course");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError() {
      toast.error("Oops! Something went wrong while creating a new course");
    },
  });

  return { createMutation };
}

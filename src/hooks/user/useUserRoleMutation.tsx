import { useToast } from "@/components/ui/Toaster";
import { API } from "@/service/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUserRoleMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const updateMutation = useMutation({
    mutationFn(data: { ids: number[]; role: number }) {
      return API.put("/users/bulk/role", data);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Successfuly updated role");
    },
    onError() {
      toast.error("Oops! Something went wrong");
    },
  });

  return { updateMutation };
}

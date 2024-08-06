import { useToast } from "@/components/ui/Toaster";
import { API } from "@/service/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type AddMutationPayload = {
  content_type: string;
  session_id: number;
  url: string;
  desc: string;
};

export default function useContentMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const addMutation = useMutation({
    mutationFn: (data: AddMutationPayload) => API.post("/contents", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      toast.success("Successfuly added a new outline");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return { addMutation };
}

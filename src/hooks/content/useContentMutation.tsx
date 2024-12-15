import { useToast } from "@/components/ui/Toaster";
import { API } from "@/service/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type AddMutationPayload = {
  content_type: string;
  session_id: number;
  url: string;
  desc: string;
};

type UpdateMutationPayload = {
  contentId: number;
  data: {
    url?: string;
    desc?: string;
  };
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

  const updateMutation = useMutation({
    mutationFn: (data: UpdateMutationPayload) =>
      API.put(`/contents/${data.contentId}`, {
        ...data.data,
        content_type: "link",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (contentId: string) => API.delete(`/contents/${contentId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      toast.success("Successfuly deleted outline");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return { addMutation, updateMutation, deleteMutation };
}

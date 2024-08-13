import { useToast } from "@/components/ui/Toaster";
import { API } from "@/service/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import { SessionQueryType } from "../session/useSessionQuery";

type AddMutationPayload = {
  content_type: string;
  session_id: number;
  url: string;
  desc: string;
};

type UpdateMutationPayload = {
  outlineId: string;
  data: {
    url?: string;
    desc?: string;
  };
};

export default function useContentMutation(sessionId?: number) {
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
      API.put(`/contents/${data.outlineId}`, {
        ...data.data,
        content_type: "link",
      }),
    onMutate: async (data) => {
      if (!sessionId) {
        return console.error(
          "sessionId needs to be passed in to activate content optimistic update (useContentMutation)"
        );
      }

      await queryClient.cancelQueries({ queryKey: ["sessions"] });
      const prev = queryClient.getQueryData<SessionQueryType>([
        "sessions",
        sessionId,
      ]);

      // Optimisically updated data using immer
      const newData = produce(prev, (draft) => {
        if (!draft) return draft;
        const contents = draft.data.data.contents;
        const idx = contents?.findIndex(
          (item) => item.id === Number(data.outlineId)
        );
        if (idx)
          draft.data.data.contents[idx] = {
            content_type: "link",
            desc: data.data.desc || contents[idx].desc,
            url: data.data.url || contents[idx].url,
            id: contents[idx].id,
          };
        return draft;
      });

      queryClient.setQueriesData({ queryKey: ["sessions"] }, newData);
      return { prev };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      // toast.success("Successfuly updated outline");
    },
    onError: (_, __, context) => {
      queryClient.setQueriesData({ queryKey: ["sessions"] }, context?.prev);
      toast.error("Something went wrong");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (outlineId: string) => API.delete(`/contents/${outlineId}`),
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

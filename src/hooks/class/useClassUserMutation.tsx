import { useToast } from "@/components/ui/Toaster";
import { API } from "@/service/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  classId: number;
};

export default function useClassUserMutation({ classId }: Props) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const assignPraetoMutation = useMutation({
    mutationFn(data: { id: number }) {
      return API.post(`/classes/${classId}/praetorian`, data);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["class"] });
      toast.success("Successfuly assigned praetorian");
    },
    onError() {
      toast.error("Oops, something went wrong!");
    },
  });

  const assignMemberMutation = useMutation({
    mutationFn(data: { ids: number[] }) {
      return API.post(`/classes/${classId}/members`, data);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["class"] });
      toast.success("Successfuly assigned member");
    },
    onError() {
      toast.error("Oops, something went wrong!");
    },
  });

  const removeMemberMutation = useMutation({
    mutationFn(id: number) {
      return API.delete(`/classes/${classId}/members/${id}`);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["class"] });
      toast.success("Successfuly removed member");
    },
    onError() {
      toast.error("Oops, something went wrong!");
    },
  });

  return { assignPraetoMutation, assignMemberMutation, removeMemberMutation };
}

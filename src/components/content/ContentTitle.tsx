import useSessionMutation from "@/hooks/session/useSessionMutation";
import ContentEditableInput from "../ui/ContentEditable";
import { useIsFetching } from "@tanstack/react-query";
import { Session } from "@/lib/types";
import Badge from "../general/Badge";

type Props = {
  sessionId?: number;
  week?: number;
  sessionData?: Session;
  isLoading?: boolean;
};

export default function ContentTitle({
  sessionId,
  week,
  sessionData,
  isLoading,
}: Props) {
  const isFetchingSessions = useIsFetching({
    queryKey: ["sessions", sessionId],
  });
  const { updateMutation } = useSessionMutation();

  return (
    <div className="mt-4 mb-6">
      <p className="text-light mb-1">Session Title</p>
      <ContentEditableInput
        className="text-2xl font-semibold mb-2"
        value={sessionData?.description}
        skeletonProps={{
          height: "2rem",
        }}
        isLoading={isLoading}
        isMutating={updateMutation.isPending || Boolean(isFetchingSessions)}
        onMutate={(value, complete) => {
          if (!sessionId) return;
          updateMutation.mutate(
            {
              id: sessionId,
              description: value,
            },
            { onSettled: complete }
          );
        }}
      />
      <Badge variant={"primary"}>Week {week}</Badge>
    </div>
  );
}

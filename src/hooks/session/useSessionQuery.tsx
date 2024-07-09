import { ServerSuccessResponse, Session } from "@/lib/types";
import { API } from "@/service/API";
import { useQuery } from "@tanstack/react-query";

type Props = {
  id: number;
};

export default function useSessionQuery({ id }: Props) {
  const sessionQuery = useQuery({
    queryFn() {
      return API.get<ServerSuccessResponse<Session>>(`/sessions/${id}`);
    },
    queryKey: ["sessions", id],
  });

  const sessionData = sessionQuery.data?.data.data;

  return { sessionQuery, sessionData };
}

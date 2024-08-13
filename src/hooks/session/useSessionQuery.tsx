import { ServerSuccessResponse, Session } from "@/lib/types";
import { API } from "@/service/API";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

type Props = {
  id: number;
};

export type SessionQueryType = AxiosResponse<
  ServerSuccessResponse<Session>,
  unknown
>;

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

import { ServerSuccessResponse } from "@/lib/types";
import { API } from "@/service/API";
import { useQuery } from "@tanstack/react-query";

// export type ContentQueryReturn = AxiosResponse<
//   ServerSuccessResponse<Session>,
//   unknown
// >;

export default function useContentQuery({ id }: { id?: string }) {
  const contentQuery = useQuery({
    queryFn: () => API.get<ServerSuccessResponse>(`/contents/${id}`),
    queryKey: ["contents", id],
  });

  const contentData = contentQuery.data?.data.data;

  return { contentData, contentQuery };
}

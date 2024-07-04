import { ServerSuccessResponse, UserData } from "@/lib/types";
import { API } from "@/service/API";
import { useQuery } from "@tanstack/react-query";

export default function useUserQuery() {
  const userQuery = useQuery({
    queryFn: () => {
      return API.get<ServerSuccessResponse<UserData[]>>("/users");
    },
    queryKey: ["users"],
  });

  const userData = userQuery.data?.data.data;

  return { userQuery, userData };
}

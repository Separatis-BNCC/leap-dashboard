import { Region, ServerSuccessResponse } from "@/lib/types";
import { API } from "@/service/API";
import { useQuery } from "@tanstack/react-query";

export default function UseRegionQuery() {
  const regionQuery = useQuery({
    queryFn() {
      return API.get<ServerSuccessResponse<Region[]>>(
        "profiles/options/regions"
      );
    },
    queryKey: ["regions"],
  });

  const regionData = regionQuery.data?.data.data;

  return { regionQuery, regionData };
}

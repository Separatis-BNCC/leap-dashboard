import { Course, ServerSuccessResponse } from "@/lib/types";
import { API } from "@/service/API";
import { useQuery } from "@tanstack/react-query";

export default function useCourseQuery() {
  const coursesQuery = useQuery({
    queryFn: () => API.get<ServerSuccessResponse<Course[]>>("/courses"),
    queryKey: ["courses"],
  });

  const coursesData = coursesQuery.data?.data.data;

  return { coursesData, coursesQuery };
}

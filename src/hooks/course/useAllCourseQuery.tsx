import { Course, ServerSuccessResponse } from "@/lib/types";
import { API } from "@/service/API";
import { useQuery } from "@tanstack/react-query";

export default function useAllCourseQuery() {
  const allCourseQuery = useQuery({
    queryFn: () =>
      API.get<ServerSuccessResponse<Omit<Course, "sessions" | "classes">[]>>(
        "/courses"
      ),
    queryKey: ["allCourses"],
  });

  const allCourseData = allCourseQuery.data?.data.data;

  return { allCourseData, allCourseQuery };
}

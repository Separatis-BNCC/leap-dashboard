import { Course, ServerSuccessResponse } from "@/lib/types";
import { API } from "@/service/API";
import { useQuery } from "@tanstack/react-query";

export default function useCourseQuery({ id }: { id: number }) {
  const courseQuery = useQuery({
    queryFn: () => API.get<ServerSuccessResponse<Course>>(`/courses/${id}`),
    queryKey: ["course", id],
  });

  const courseData = courseQuery.data?.data.data;

  return { courseData, courseQuery };
}

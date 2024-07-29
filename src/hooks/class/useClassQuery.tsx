import { Classes, ServerSuccessResponse } from "@/lib/types";
import { API } from "@/service/API";
import { useQuery } from "@tanstack/react-query";

type Props = {
  classId?: number;
};

export default function useClassQuery({ classId }: Props) {
  const classQuery = useQuery({
    queryFn() {
      return API.get<ServerSuccessResponse<Classes>>(`/classes/${classId}`);
    },
    queryKey: ["class", classId],
    enabled: Boolean(classId),
  });

  const classData = classQuery.data?.data.data;

  return { classQuery, classData };
}

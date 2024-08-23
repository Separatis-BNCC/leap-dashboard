import { Outlet, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import useClassQuery from "@/hooks/class/useClassQuery";
import { useMemo } from "react";
import useUserQuery from "@/hooks/user/useUserQuery";
import { Classes, UserData } from "@/lib/types";
import ClassNavigation from "@/components/classes/ClassNavigation";

export type ClassContext = {
  classData?: Classes;
  members?: UserData[];
  isFetchingClassData: boolean;
};

export default function ClassLayout() {
  const { classId } = useParams();
  const {
    classData,
    classQuery: { isFetching },
  } = useClassQuery({ classId: Number(classId) });
  const { userData } = useUserQuery();

  const classMembers = useMemo(() => {
    const membersId = new Set(classData?.members?.map((member) => member.id));
    return userData?.filter((user) => membersId.has(user.id));
  }, [userData, classData]);

  return (
    <div className="flex flex-col flex-1 p-8 w-full min-w-[72.5rem]">
      <div className="flex justify-between items-end mb-4">
        <div className="">
          <p className="mb-1">Class</p>
          <div className="text-dark font-semibold text-3xl">
            {classData?.name || (
              <Skeleton height={"100%"} className="text-3xl" width={"8rem"} />
            )}
          </div>
        </div>
        <ClassNavigation />
      </div>

      <Outlet
        context={
          {
            classData,
            members: classMembers,
            isFetchingClassData: isFetching,
          } satisfies ClassContext
        }
      />
    </div>
  );
}

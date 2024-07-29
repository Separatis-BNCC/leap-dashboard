import { Outlet, useParams } from "react-router-dom";
import ClassNavigation from "../components/classes/ClassNavigation";
import Skeleton from "react-loading-skeleton";
import useClassQuery from "@/hooks/class/useClassQuery";

export default function ClassLayout() {
  const { classId } = useParams();
  const { classData } = useClassQuery({ classId: Number(classId) });
  return (
    <div className="p-8 flex flex-col">
      <p className="mb-1">Class</p>
      <div className="flex justify-between items-center">
        <div className="text-dark font-semibold text-3xl">
          {classData?.name || (
            <Skeleton height={"100%"} className="text-3xl" width={"8rem"} />
          )}
        </div>
        {/* <div onClick={() => setIsShowingDetails((cur) => !cur)}>
          {isShowingDetails ? (
            <i className="bx bxs-grid-alt text-2xl cursor-pointer hover:text-dark transition-all duration-100 text-light"></i>
          ) : (
            <i className="bx bx-calendar text-2xl cursor-pointer hover:text-dark transition-all duration-100 text-light"></i>
          )}
        </div> */}
      </div>
      <ClassNavigation />
      <Outlet />
    </div>
  );
}

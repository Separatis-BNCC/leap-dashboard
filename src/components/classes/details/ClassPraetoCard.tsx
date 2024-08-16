import useClassQuery from "@/hooks/class/useClassQuery";
import { useOutletContext, useParams } from "react-router-dom";
import { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import { Button } from "@/components/ui/Button";
import { useDialog } from "@/components/general/Dialog";
import { AssignPraetoContext } from "../AssignPraeto";
import { ClassContext } from "@/pages/ClassLayout";

export default function ClassPraetoCard() {
  const { classId } = useParams();
  const { classData } = useClassQuery({ classId });
  const { showDialog } = useDialog();

  const { members } = useOutletContext<ClassContext>();

  const praetorian = useMemo(
    () => members?.find((user) => user.role === 2),
    [members]
  );

  const handleOpenAssignDialog = () => {
    if (!classData) return;
    showDialog("assign-praeto", {
      classId: classData?.id,
      currentPraeto: praetorian,
    } satisfies AssignPraetoContext);
  };

  // Ni gmn ya biar ga kek gini
  const praetoName =
    praetorian?.profile?.first_name && praetorian?.profile?.last_name
      ? `${praetorian?.profile?.first_name} ${praetorian?.profile?.last_name}`
      : undefined;

  return (
    <div className="relative min-h-[14rem]">
      <article className="bg-gradient-to-bl flex flex-col from-highlight-dark to-highlight-light relative z-[1] h-[97.5%] rounded-md p-5  transition-all duration-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <i className="bx bxs-graduation text-dark text-2xl rounded-full w-[2.5rem] aspect-square flex items-center justify-center  bg-white"></i>
            <p className="text-white">Praetorian</p>
          </div>
          <Button variant={"ghost"} onClick={handleOpenAssignDialog}>
            <i className="bx bx-edit text-xl text-white"></i>
          </Button>
        </div>
        <div className="flex-1 mt-4 mb-6 flex justify-end flex-col">
          {classData && members ? (
            <h2 className="text-4xl leading-[125%] text-white">
              {praetoName || "Praetorian Not Set"}
            </h2>
          ) : (
            <Skeleton height={"3rem"} />
          )}
        </div>
        {classData ? (
          praetorian ? (
            <p className="text-white mt-2 mb-2">{praetorian?.email}</p>
          ) : (
            <Button
              variant={"hollow"}
              className="py-4 mt-2 mb-2 max-w-[10rem]"
              onClick={handleOpenAssignDialog}
            >
              + Assign Praeto
            </Button>
          )
        ) : (
          <Skeleton />
        )}
      </article>
      <div className="bg-[#CCD4FF] w-full h-full absolute inset-0 translate-y-[0.75rem] scale-95 transition-all duration-200  rounded-md"></div>
    </div>
  );
}

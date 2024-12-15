import ProfilePicture from "@/components/general/ProfilePicture";
import { Button } from "@/components/ui/Button";
import { AssignPraetoContext } from "../AssignPraeto";
import { useOutletContext } from "react-router-dom";
import { ClassContext } from "@/pages/ClassLayout";
import { useMemo } from "react";
import { useDialog } from "@/components/general/Dialog";
import Skeleton from "react-loading-skeleton";

export default function ClassPraetorian() {
  const { showDialog } = useDialog();

  const { classData, isFetchingClassData } = useOutletContext<ClassContext>();

  const praetorian = useMemo(
    () => classData?.members.find((data) => data.role === 2),
    [classData]
  );

  const handleOpenAssignDialog = () => {
    if (!classData) return;
    showDialog("assign-praeto", {
      classId: classData?.id,
      currentPraeto: praetorian,
    } satisfies AssignPraetoContext);
  };

  // // Ni gmn ya biar ga kek gini
  const praetoName =
    praetorian?.profile?.first_name && praetorian?.profile?.last_name
      ? `${praetorian?.profile?.first_name} ${praetorian?.profile?.last_name}`
      : undefined;

  return (
    <div className="bg-white border border-border rounded-md flex-1 px-5 py-3">
      <div className="flex gap-2 items-center">
        <i className="bx bxs-graduation text-xl text-light"></i>
        <p className="text-light">Praetorian</p>
      </div>
      <div className="h-[1px] bg-border mt-2 mb-2"></div>
      <div className="grid grid-cols-[auto_1fr_auto] gap-x-4 mt-4 ">
        <ProfilePicture
          isLoading={isFetchingClassData}
          className="row-span-2 h-10"
        />
        {isFetchingClassData ? (
          <Skeleton height={"1rem"} width={"10rem"} />
        ) : (
          <p className="text-dark">{praetoName || "Praetorian not set"}</p>
        )}
        <Button
          className="row-span-2 self-center"
          variant={"accent"}
          onClick={handleOpenAssignDialog}
          disabled={isFetchingClassData}
        >
          Assign
        </Button>
        {isFetchingClassData ? (
          <Skeleton width={"12.5rem"} height={"1rem"} />
        ) : (
          <p className="text-light">
            {praetorian?.email || "No praetorian was selected"}
          </p>
        )}
      </div>
    </div>
  );
}

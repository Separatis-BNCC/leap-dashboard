import { getRoleColor, role } from "@/assets/lookup-data";
import { useEffect, useState } from "react";
import { capitalize, cn } from "@/lib/utils";
import useUserRoleMutation from "@/hooks/user/useUserRoleMutation";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { UserData } from "@/lib/types";
import { useQueryClient } from "@tanstack/react-query";
import { useUserTable } from "@/context/UserTableContext";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";

type Props = {
  userIds: number[];
  userDataList: UserData[];
  onMutate?: (mutatingIds: number[]) => void;
};

// Checks if all the roles in the userDataList are the same, if not then return undefined
function findSelectedRole(userDataList: UserData[]) {
  if (userDataList.length === 0) return undefined;
  const selectedRole = userDataList[0].role;
  for (let i = 0; i < userDataList.length; i++) {
    if (userDataList[i].role !== selectedRole) return undefined;
  }
  return selectedRole;
}

export default function UserRoleBulkPopover({
  userIds,
  userDataList,
  onMutate,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { updateMutation } = useUserRoleMutation();

  const { setUsersUpdatingRoles } = useUserTable();
  const [loadingRole, setLoadingRole] = useState<undefined | number>();

  const selectedRole = findSelectedRole(userDataList);
  const usersQueryState = queryClient.getQueryState(["users"]);

  const isUpdating = usersQueryState?.isInvalidated || updateMutation.isPending;

  useEffect(() => {
    if (isUpdating) return;
    setUsersUpdatingRoles([]);
    setLoadingRole(undefined);
  }, [isUpdating, setUsersUpdatingRoles]);

  return (
    <Popover onOpenChange={setIsOpen} open={isOpen}>
      <PopoverTrigger className={cn(isUpdating && "pointer-events-none")}>
        <div
          className={cn(
            "ml-4 flex items-center gap-2 justify-center cursor-pointer hover:opacity-50 transition-all duration-100",
            isUpdating && "opacity-50"
          )}
        >
          <div className="">
            <i className="bx bx-user text-lg text-white cursor-pointer hover:opacity-50 transition-all duration-100"></i>
          </div>
          <p className="text-white whitespace-nowrap flex-1">Edit Role</p>
        </div>
      </PopoverTrigger>
      <PopoverContent className=" py-2 px-2 gap-2 grid bg-white border-[1px] border-slate-200 rounded-md w-[12.5rem]">
        <div className="px-2 pb-2 pr-8 border-b border-slate-200 flex gap-2 items-center">
          <i className="bx bx-user text-lg text-dark"></i>
          <h3 className=" whitespace-nowrap">Assign Role</h3>
        </div>
        {role.map((item, i) => {
          const updatingCurrentRole = loadingRole === i;
          const selected = selectedRole === i + 1;

          if (item === "admin") return;
          return (
            <div
              className={cn(
                "px-2 flex items-center gap-2 py-1 rounded-md duration-100 transition-all cursor-pointer",
                selected && "bg-slate-100",
                !isUpdating && "hover:bg-slate-50"
              )}
              onClick={() => {
                if (isUpdating) return;
                if (onMutate) onMutate(userIds);
                setIsOpen(false);
                updateMutation.mutate({ ids: userIds, role: i + 1 });
                setUsersUpdatingRoles(userIds);
                setLoadingRole(i);
              }}
            >
              <div
                className={cn(getRoleColor(i + 1), "w-2 h-2 rounded-full ")}
              ></div>
              <p className="text-light whitespace-nowrap flex-1">
                {capitalize(item)}
              </p>
              {updatingCurrentRole && <LoadingSpinner />}
            </div>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}

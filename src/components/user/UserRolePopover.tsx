import { getRoleColor, role } from "@/assets/lookup-data";
import RoleBadge from "../course/RoleBadge";
import { useEffect, useRef, useState } from "react";
import { capitalize, cn } from "@/lib/utils";
import useUserRoleMutation from "@/hooks/user/useUserRoleMutation";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { useQueryClient } from "@tanstack/react-query";
import { useUserTable } from "@/context/UserTableContext";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";

type Props = {
  roleId: number;
  userId: number;
};

export default function UserRolePopover({ roleId, userId }: Props) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();
  const { setUsersUpdatingRoles, usersUpdatingRoles } = useUserTable();
  const [loadingRole, setLoadingRole] = useState<undefined | number>();

  const usersQueryState = queryClient.getQueryState(["users"]);

  const { updateMutation } = useUserRoleMutation();

  const isUpdating = usersQueryState?.isInvalidated || updateMutation.isPending;

  useEffect(() => {
    if (isUpdating) return;
    setUsersUpdatingRoles([]);
    setLoadingRole(undefined);
  }, [isUpdating, setUsersUpdatingRoles]);

  return (
    <Popover className="w-fit ">
      <PopoverTrigger>
        <RoleBadge
          isLoading={usersUpdatingRoles.includes(userId)}
          ref={contentRef}
          roleId={roleId}
        ></RoleBadge>
      </PopoverTrigger>
      <PopoverContent className="translate-y-[0.5rem] py-2 px-2 gap-2 grid bg-white border-[1px] border-slate-200 rounded-md shadow-lg shadow-bg">
        <div className="px-2 pb-2 pr-8 border-b border-slate-200 flex gap-2 items-center">
          <i className="bx bx-user text-lg text-dark"></i>
          <h3 className="whitespace-nowrap">Assign Role</h3>
        </div>
        {role.map((item, i) => {
          const currentRole = i + 1;
          const updating = currentRole === loadingRole;
          const selected = roleId === currentRole;

          if (item === "admin") return;
          return (
            <div
              className={cn(
                "px-2 flex items-center gap-2 py-1 rounded-md duration-100 transition-all",
                selected && "bg-slate-100",
                !selected && !isUpdating && "hover:bg-slate-50"
              )}
              onClick={() => {
                if (isUpdating) return;
                updateMutation.mutate({ ids: [userId], role: currentRole });
                setUsersUpdatingRoles([userId]);
                setLoadingRole(currentRole);
              }}
            >
              <div
                className={cn(
                  getRoleColor(currentRole),
                  "w-2 h-2 rounded-full "
                )}
              ></div>
              <p className="text-light whitespace-nowrap flex-1">
                {capitalize(item)}
              </p>
              {updating && <LoadingSpinner />}
            </div>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}

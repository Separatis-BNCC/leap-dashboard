import { getRoleColor, role } from "@/assets/lookup-data";
import Popover from "../ui/Popover";
import RoleBadge from "../course/RoleBadge";
import { useEffect, useRef, useState } from "react";
import { capitalize, cn } from "@/lib/utils";
import useUserRoleMutation from "@/hooks/user/useUserRoleMutation";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  roleId: number;
  userIds: number[];
};

export default function UserRolePopover({ roleId, userIds }: Props) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();
  const usersQueryState = queryClient.getQueryState(["users"]);
  const [loading, setLoading] = useState<undefined | number>();
  const { updateMutation } = useUserRoleMutation();

  const isUpdating = usersQueryState?.isInvalidated || updateMutation.isPending;

  useEffect(() => {
    if (!isUpdating) setLoading(undefined);
  }, [isUpdating]);

  return (
    <Popover.Container isolate className="w-fit ">
      <Popover.Trigger>
        <RoleBadge
          isLoading={isUpdating}
          ref={contentRef}
          roleId={roleId}
        ></RoleBadge>
      </Popover.Trigger>
      <Popover.Content className="fixed left-[initial] top-[initial] translate-y-[0.5rem] py-2 px-2 gap-2 grid bg-white border-[1px] border-slate-200 rounded-md shadow-lg shadow-bg">
        <div className="px-2 pb-2 pr-8 border-b border-slate-200 flex gap-2 items-center">
          <i className="bx bx-user text-lg text-dark"></i>
          <h3 className=" whitespace-nowrap">Assign Role</h3>
        </div>
        {role.map((item, i) => {
          const updating = loading === i;
          const selected = roleId === i + 1;

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
                updateMutation.mutate({ ids: userIds, role: i + 1 });
                setLoading(i);
              }}
            >
              <div
                className={cn(getRoleColor(i + 1), "w-2 h-2 rounded-full ")}
              ></div>
              <p className="text-light whitespace-nowrap flex-1">
                {capitalize(item)}
              </p>
              {updating && <LoadingSpinner />}
            </div>
          );
        })}
      </Popover.Content>
    </Popover.Container>
  );
}

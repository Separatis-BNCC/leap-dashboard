import { capitalize, cn, getRole } from "@/lib/utils";

type Props = {
  roleId?: number;
};

export default function RoleBadge({ roleId }: Props) {
  if (!roleId) return <div>Unknown</div>;
  return (
    <div
      className={cn(
        "bg-bg w-fit text-highlight px-3 py-[1px] rounded-full border-[1px] border-highlight/20"
      )}
    >
      {capitalize(getRole(roleId || 1))}
    </div>
  );
}

import { capitalize, cn, getRole } from "@/lib/utils";
import { cva } from "class-variance-authority";

type Props = {
  roleId?: number;
};

const variants = cva(
  " w-fit px-3 py-[1px] rounded-full border-[1px] border-highlight/20",
  {
    variants: {
      role: {
        member: "bg-bg text-highlight border-[1px]",
        aktivis: "bg-orange-100 text-orange-500 border-orange-200",
        admin: "bg-bg text-highlight border-[1px]",
        praeto: "bg-bg text-highlight border-[1px]",
      },
    },
  }
);

export default function RoleBadge({ roleId }: Props) {
  if (!roleId) return <div>Unknown</div>;
  const role = getRole(roleId || 1);

  return <div className={cn(variants({ role }))}>{capitalize(role)}</div>;
}

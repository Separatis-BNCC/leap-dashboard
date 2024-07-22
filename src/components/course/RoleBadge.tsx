import { capitalize, cn } from "@/lib/utils";
import { getRole } from "@/assets/lookup-data";
import { cva } from "class-variance-authority";
import { forwardRef, ReactNode } from "react";
import { LoadingSpinner } from "../ui/LoadingSpinner";

type Props = {
  roleId?: number;
  children?: ReactNode;
  className?: string;
  isLoading?: boolean;
  ref?: React.LegacyRef<HTMLDivElement>;
};

const variants = cva(
  " w-fit px-3 py-[1px] rounded-full border-[1px] border-highlight/20",
  {
    variants: {
      role: {
        member: "bg-bg text-highlight border-[1px]",
        aktivis: "bg-orange-100 text-orange-500 border-orange-200",
        admin: "bg-red-100 text-red-400 text-highlight border-[1px]",
        praeto: "bg-purple-100 text-purple-500 border-purple-300 border-[1px]",
        loading:
          "bg-slate-100 text-slate-500 border-[1px] border-slate-200 px-6 py-1",
      },
    },
  }
);

const RoleBadge = forwardRef<HTMLDivElement, Props>(function (
  { roleId, children, className, isLoading },
  ref
) {
  if (!roleId) return <div ref={ref}>Unknown</div>;
  const role = getRole(roleId || 1);

  return (
    <div
      ref={ref}
      className={cn(
        // User role variant
        variants({ role }),
        // Loading variant
        isLoading && variants({ role: "loading" }),
        // External class
        className
      )}
    >
      {isLoading ? <LoadingSpinner /> : children || capitalize(role)}
    </div>
  );
});

export default RoleBadge;

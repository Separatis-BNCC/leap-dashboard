import { capitalize, cn } from "@/lib/utils";
import { getRole } from "@/assets/lookup-data";
import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, ReactNode } from "react";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import Skeleton from "react-loading-skeleton";

const variants = cva(
  " w-fit px-3 py-[1px] rounded-full border-[1px] border-highlight/20",
  {
    variants: {
      variant: {
        primary: "bg-bg text-highlight border-[1px]",
        green: "bg-green-200 text-green-700 border-green-500",
        purple: "bg-purple-200 text-purple-700 border-purple-500",
        gray: "bg-slate-200 text-slate-700 border-slate-500",
      },
    },
  }
);

type Props = {
  children?: ReactNode;
  className?: string;
  variant: VariantProps<typeof variants>["variant"];
  isLoading?: boolean;
  ref?: React.LegacyRef<HTMLDivElement>;
};
const Badge = forwardRef<HTMLDivElement, Props>(function (
  { variant, children, className, isLoading },
  ref
) {
  if (!variant) return <div ref={ref}>Unknown</div>;
  if (isLoading)
    return (
      <Skeleton borderRadius={"9999px"} width={"6rem"} height={"1.25rem"} />
    );

  return (
    <div
      ref={ref}
      className={cn(
        // User role variant
        variants({ variant }),
        // External class
        className
      )}
    >
      {children}
    </div>
  );
});

export default Badge;

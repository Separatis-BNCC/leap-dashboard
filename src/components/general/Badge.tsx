import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, ReactNode } from "react";
import Skeleton from "react-loading-skeleton";

const variants = cva(
  " w-fit px-3 py-[1px] rounded-full border-[1px] border-highlight/20",
  {
    variants: {
      variant: {
        primary: "bg-bg text-highlight border-[1px]",
        green: "bg-green-100 text-green-500 border-green-300",
        purple: "bg-purple-100 text-purple-500 border-purple-300",
        gray: "bg-slate-100 text-slate-500 border-slate-300",
        red: "bg-red-100 text-red-500 border-red-500",
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

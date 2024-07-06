import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export default function Logo({ ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <h3
      {...props}
      className={cn("text-xl font-semibold text-dark", props.className)}
    >
      Leap.
    </h3>
  );
}

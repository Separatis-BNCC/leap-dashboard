import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  percent: number;
  children?: ReactNode;
};

export default function DonutChart({ percent, children }: Props) {
  const degree = (percent / 100) * 360;

  return (
    <div
      className={cn(
        "h-60 aspect-square bg-highlight rounded-full relative transition-none duration-200"
      )}
      style={{
        background: `conic-gradient(
          rgb(0, 98, 244) 0deg, 
          rgb(0, 98, 244) ${degree}deg, 
          rgb(237, 243, 255) ${degree}deg, 
          rgb(237, 243, 255) 360deg
        )`,
      }}
    >
      <div className="absolute inset-5 bg-white rounded-full">{children}</div>
    </div>
  );
}

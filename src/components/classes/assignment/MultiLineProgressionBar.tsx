import { cn } from "@/lib/utils";
import { HTMLAttributes, useMemo } from "react";

type DataItem = {
  color: string;
  value: number;
  textColor: string;
  disableTooltip?: boolean;
};

type Props<EnableTooltip extends boolean = false> = {
  // Only require "textColor" when enableTooltip is true (works by infering the type btw)
  data: EnableTooltip extends false
    ? Omit<DataItem, "textColor">[]
    : DataItem[];

  enableTooltip?: EnableTooltip;
};

export default function MultiLineProgressionBar<T extends boolean = false>({
  data,
  enableTooltip,
  ...props
}: Props<T> & HTMLAttributes<HTMLDivElement>) {
  const dataWithPercentages = useMemo(() => {
    const total = data.reduce((sum, cur) => (sum += cur.value), 0);

    /**
     * The accumulated percentage is used because the stacking works like the following :
     * 4         ----
     * 4 + 3     -------
     * 4 + 3 + 4 -----------
     */
    let accumulated = 0;
    return data.map((item) => {
      accumulated += item.value * 100;
      return {
        ...item,
        accumulatedPercentage: accumulated / total,
        percentage: (item.value * 100) / total,
      };
    });
  }, [data]);

  return (
    <div
      {...props}
      className={cn("h-2 rounded-full w-full relative ", props.className)}
    >
      {dataWithPercentages.map((bar, i) => {
        return (
          <div
            className="absolute left-0 rounded-full right-0 top-0 bottom-0 origin-left isolate"
            style={{
              backgroundColor: bar.color,
              width: `${bar.accumulatedPercentage}%`,
              // The first element should be at the very top
              zIndex: data.length - i,
            }}
          >
            {enableTooltip && !bar.disableTooltip && (
              <div
                className="absolute top-4 px-2 py-[1px] right-0 translate-x-[50%] bg-bg text-dark rounded-sm"
                style={{
                  zIndex: data.length + 1,
                  background: bar.color,
                  color: "textColor" in bar ? bar.textColor : "black",
                }}
              >
                {bar.percentage.toFixed(1)}%
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

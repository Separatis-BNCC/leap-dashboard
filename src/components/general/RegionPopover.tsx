import UseRegionQuery from "@/hooks/profile/useRegionQuery";
import Popover from "../ui/Popover";
import { HTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";
import Skeleton from "react-loading-skeleton";

type Props = {
  onSelect: (data?: string, dataIndex?: number) => void;
  defaultValue?: number;
};

const regionMap = ["Kemanggisan", "Alam Sutera", "Bandung", "Malang"];

export default function RegionPopover({
  onSelect,
  defaultValue,
  ...props
}: Props & Omit<HTMLAttributes<HTMLDivElement>, "onSelect">) {
  const { regionData } = UseRegionQuery();
  const [selected, setSelected] = useState<string | undefined>(() =>
    defaultValue ? regionMap[defaultValue] : undefined
  );
  if (!regionData) return <Skeleton height={"3rem"} />;

  return (
    <Popover.Container
      {...props}
      className={cn(" border-[1px] border-border rounded-md ", props.className)}
    >
      <Popover.Trigger className=" rounded-md px-4 pl-6 py-2 bg-white flex justify-between items-center hover:bg-bg/40 transition-all duration-100 cursor-pointer">
        {selected ? (
          <p className="text-dark">{selected}</p>
        ) : (
          <p className="text-light">Select Region</p>
        )}
        <i className="bx bx-chevron-down text-2xl "></i>
      </Popover.Trigger>
      <Popover.Content className="bg-white w-full max-w-[14rem] top-[3rem] rounded-md grid p-2 shadow-lg">
        <div className="flex px-2 py-2 mb-2 gap-2 items-center border-b-[1px] border-border">
          <i className="bx bxs-map text-lg"></i>
          <p className="font-semibold">Regions</p>
        </div>
        {regionData.map((data) => {
          const isSelected = data.label === selected;
          return (
            <div
              onClick={() => {
                const newValue =
                  selected === data.label ? undefined : data.label;
                setSelected(newValue);
                onSelect(
                  newValue,
                  newValue ? regionMap.indexOf(data.label) + 1 : undefined
                );
              }}
              className={cn(
                " px-4 py-2 rounded-md cursor-pointer transition-all duration-100 trunacte relative pl-6",
                isSelected ? "bg-bg text-highlight" : "hover:bg-bg/50 "
              )}
            >
              <div
                className={cn(
                  "absolute w-[4px] aspect-square rounded-full bg-dark top-[50%] translate-y-[-50%] left-2 transition-all duration-100",
                  isSelected && "bg-highlight"
                )}
              ></div>
              {data.label}
            </div>
          );
        })}
      </Popover.Content>
    </Popover.Container>
  );
}

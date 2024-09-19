import { cn } from "@/lib/utils";
import { useState } from "react";

type Props = {
  onSearch?: (value: string) => void;
  value?: string;
  placeholder?: string;
};

export default function SearchInput({
  onSearch,
  placeholder,
  value,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & Props) {
  const [searchValue, setSearchValue] = useState(props.defaultValue);

  const usedValue = typeof value === "undefined" ? searchValue : value;

  return (
    <div
      {...props}
      className={cn(
        "relative border-[1px] border-border rounded-md",
        props.className
      )}
    >
      <input
        className="w-full h-full px-4 py-2 rounded-md"
        placeholder={placeholder || "Search"}
        value={usedValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          if (onSearch) onSearch(e.target.value);
        }}
      />
      <i className="bx bx-search absolute right-[1rem] top-[50%] translate-y-[-50%] text-lg text-light"></i>
    </div>
  );
}

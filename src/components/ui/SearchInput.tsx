import { cn } from "@/lib/utils";
import { useState } from "react";

type Props = {
  onSearch?: (value: string) => void;
  placeholder?: string;
};

export default function SearchInput({
  onSearch,
  placeholder,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & Props) {
  const [value, setValue] = useState(props.defaultValue);
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
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (onSearch) onSearch(e.target.value);
        }}
      />
      <i className="bx bx-search absolute right-[1rem] top-[50%] translate-y-[-50%] text-lg text-light"></i>
    </div>
  );
}

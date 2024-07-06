import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

type Props = {
  asChild?: boolean;
  isSelected?: boolean;

  children: ReactNode;
};

export default function NavbarItem({
  asChild,
  children,
  isSelected,
  ...props
}: Props & HTMLAttributes<HTMLLIElement>) {
  return (
    <li
      {...props}
      className={cn(
        "flex [&_i]:text-xl relative rounded-sm gap-2 px-4 py-2 items-center justify-start [&>*]:text-light overflow-hidden transition-all duration-100 cursor-pointer hover:opacity-50 whitespace-nowrap",
        isSelected && "[&>*]:text-highlight bg-bg ",
        asChild ? "ml-5 pl-6" : "",
        props.className
      )}
    >
      <div
        className={cn(
          "absolute h-full bg-highlight w-1 left-0 opacity-0 transition-all duration-100",
          isSelected && "opacity-100"
        )}
      ></div>

      {children}
    </li>
  );
}

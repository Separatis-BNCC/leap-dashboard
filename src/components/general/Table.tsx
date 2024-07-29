import { cn } from "@/lib/utils";

import {
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  createContext,
  useContext,
} from "react";
import { ScrollArea, ScrollBar } from "./ScrollArea";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import Skeleton from "react-loading-skeleton";

type TableContextValues = {
  gridTemplateColumns: string;
};

const TableContext = createContext<TableContextValues | null>(null);

function useTable() {
  const context = useContext(TableContext);
  if (!context)
    throw new Error("useTable must be used inside of it's Provider's scope");
  return context;
}

function Container({
  children,
  gridTemplateColumns,
  className,
  isLoading,
  ...props
}: {
  children: ReactNode;
  gridTemplateColumns: string;
  isLoading?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLUListElement>) {
  if (isLoading)
    return (
      <div
        className={cn(
          "flex flex-col gap-4 pt-6 px-8 pb-6 bg-white h-full max-h-screen"
        )}
      >
        {new Array(8).fill("x").map((_, i) => (
          <div
            className="grid grid-cols-[1fr_8fr_4fr_4fr] gap-4 h-full"
            key={i}
          >
            <Skeleton className="h-9" />
            <Skeleton className="h-9" />
            <Skeleton className="h-9" />
            <Skeleton className="h-9" />
          </div>
        ))}
      </div>
    );

  return (
    <TableContext.Provider value={{ gridTemplateColumns }}>
      <ul
        className={cn("flex flex-col h-full pt-6 pb-2", className)}
        {...props}
      >
        {children}
      </ul>
    </TableContext.Provider>
  );
}
function Row({
  highlighted,
  onSelect,
  children,
  ...props
}: Omit<HTMLAttributes<HTMLLIElement>, "onSelect"> & {
  highlighted?: boolean;
  onSelect?: (e: MouseEvent) => void;
  children: ReactNode;
}) {
  const { gridTemplateColumns } = useTable();

  return (
    <li
      {...props}
      className={cn(
        "grid gap-x-3 pl-8 pr-10 items-center py-4 cursor-pointer transition-all duration-200",
        highlighted ? "bg-bg" : "hover:bg-bg/50",
        props.className
      )}
      style={{ gridTemplateColumns }}
      onClick={onSelect}
    >
      {children}
    </li>
  );
}

function Head({
  children,
  ...props
}: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) {
  const { gridTemplateColumns } = useTable();

  return (
    <li
      className={cn("grid  gap-x-3 mb-4 pl-8 pr-10", props.className)}
      style={{ gridTemplateColumns }}
    >
      {children}
    </li>
  );
}

function Content({
  children,
  ...props
}: { children: ReactNode } & React.ComponentProps<
  typeof ScrollAreaPrimitive.Root
>) {
  return (
    <div className="flex-1 min-h-[20rem]">
      <ScrollArea {...props} className={cn("h-0 min-h-full", props.className)}>
        <div className="">{children}</div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

export default { Row, Container, Head, Content };

import { cn, toSorted } from "@/lib/utils";

import {
  HTMLAttributes,
  MouseEvent,
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ScrollArea, ScrollBar } from "./ScrollArea";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import Skeleton from "react-loading-skeleton";
import { Checkbox as GenericCheckbox } from "./Checkbox";
type TableContextValues = {
  gridTemplateColumns: string;
  emptyElement?: ReactNode;
  isEmpty: boolean;
  isLoading?: boolean;
  setIsEmpty: React.Dispatch<React.SetStateAction<boolean>>;
};

const TableContext = createContext<TableContextValues | null>(null);

function useTable() {
  const context = useContext(TableContext);
  if (!context)
    throw new Error("useTable must be used inside of it's Provider's scope");
  return context;
}

/**
 * The container's parent element needs to have a flex container (`display: flex` and `flex-direction:column`) in order for the overscroll to work properly
 */
function Container({
  children,
  gridTemplateColumns,
  className,
  emptyElement,
  isLoading,
  ...props
}: {
  children: ReactNode;
  gridTemplateColumns: string;
  isLoading?: boolean;
  emptyElement?: ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLUListElement>) {
  const [isEmpty, setIsEmpty] = useState(false);

  return (
    <TableContext.Provider
      value={{
        gridTemplateColumns,
        emptyElement,
        isLoading,
        isEmpty,
        setIsEmpty,
      }}
    >
      <ul
        className={cn(
          "flex flex-col h-full flex-1",
          isEmpty && emptyElement && "fixed invisible z-[-100]",
          className
        )}
        {...props}
      >
        {children}
      </ul>
      {emptyElement && isEmpty && (
        <div className="flex-1 [&>*]:h-full bg-white py-8 min-h-[27rem]">
          {emptyElement}
        </div>
      )}
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
      className={cn("grid  gap-x-3 pl-8 pr-10 py-4 ", props.className)}
      style={{ gridTemplateColumns }}
    >
      {children}
    </li>
  );
}

function Rows<T = unknown>({
  data,
  renderRows,
  sortFn,
}: {
  data?: T[];
  sortFn?: (a: T, b: T) => number;
  renderRows?: (data: T, index: number) => ReactElement;
}) {
  const { setIsEmpty } = useTable();

  const processedData = useMemo(() => {
    if (!data) return undefined;
    if (sortFn) {
      return toSorted(data, sortFn);
    }

    return data;
  }, [data, sortFn]);

  useEffect(() => {
    if (!processedData) return;
    setIsEmpty(processedData.length === 0);
  }, [processedData, setIsEmpty]);

  if (renderRows) {
    return processedData?.map((data, i) => renderRows(data, i));
  }
}

function Content({
  children,
  ...props
}: {
  children: ReactNode;
} & React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  const { isLoading } = useTable();

  if (isLoading)
    return (
      <div
        className={cn("flex flex-col gap-4  h-full max-h-screen bg-white p-4")}
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
    <div className="flex-1 min-h-[27rem] bg-white border-[1px] border-slate-200  rounded-md">
      <ScrollArea {...props} className={cn("h-0 min-h-full ", props.className)}>
        <div className="h-full">{children}</div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

/**
 * Checkbox wrapper than can be registered by spreading the register function from the useTable hook (not the one in this file)
 */
function SelectAllCheckbox({
  allSelected,
  handleSelectAll,
  ...props
}: React.ComponentPropsWithoutRef<typeof GenericCheckbox> & {
  allSelected?: boolean;
  handleSelectAll?: () => void;
}) {
  return (
    <GenericCheckbox
      {...props}
      onCheckedChange={handleSelectAll}
      checked={allSelected}
    />
  );
}

export function SelectionToast({
  showPopup,
  selectedData,
  handleReset,
  children,
}: {
  selectedData?: unknown[];
  showPopup?: boolean;
  handleReset?: () => void;
  children?: ReactNode;
}) {
  if (!selectedData) return;
  return (
    <div
      className={cn(
        "bg-highlight text-white w-fit items-center justify-center px-4 py-3 flex rounded-md left-[50%] translate-x-[-50%] absolute bottom-[-2.5rem] translate-y-[-2.75rem] opacity-0 transition-all duration-200",
        selectedData?.length > 0 &&
          showPopup &&
          "opacity-100 translate-y-[-3rem]"
      )}
    >
      <div className="flex items-center justify-center gap-2 border-r-[2px] border-white pr-4">
        <i
          className="bx bx-x text-xl text-white cursor-pointer hover:opacity-50 transition-all duration-100"
          onClick={handleReset}
        ></i>
        <p className="text-white whitespace-nowrap">
          {selectedData.length} Selected
        </p>
      </div>
      {children}
    </div>
  );
}

export default {
  Row,
  Rows,
  Container,
  Head,
  Content,
  SelectAllCheckbox,
  SelectionToast,
};

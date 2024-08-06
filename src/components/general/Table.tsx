import { cn, getNestedValue, toSorted } from "@/lib/utils";

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
type Filters = keyof typeof sortingFns;
type TableContextValues = {
  gridTemplateColumns: string;
  sort: Filters;
  setSort: React.Dispatch<React.SetStateAction<Filters>>;
  emptyElement?: ReactNode;
  isEmpty: boolean;
  setIsEmpty: React.Dispatch<React.SetStateAction<boolean>>;
};

const sortingFns = {
  "A-Z":
    <T,>(field: string) =>
    (a: T, b: T) =>
      String(getNestedValue(a, field as string)).localeCompare(
        String(getNestedValue(b, field as string))
      ),
  "Z-A":
    <T,>(field: string) =>
    (a: T, b: T) =>
      String(getNestedValue(b, field as string)).localeCompare(
        String(getNestedValue(a, field as string))
      ),
  // "by Date":
  //   <T,>(field: string) =>
  //   (a: T, b: T) =>
  //     dateStringToTimestamp(String(getNestedValue(a, field as string))) -
  //     dateStringToTimestamp(String(getNestedValue(b, field as string))),
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
  const [sort, setSort] = useState<Filters>("A-Z");
  const [isEmpty, setIsEmpty] = useState(false);

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

  if (emptyElement && isEmpty)
    return (
      <div className="min-h-[27rem] [&>*]:h-full bg-white border-lighter border-[1px] rounded-md flex flex-col flex-1">
        {emptyElement}
      </div>
    );

  return (
    <TableContext.Provider
      value={{
        gridTemplateColumns,
        sort,
        setSort,
        emptyElement,
        isEmpty,
        setIsEmpty,
      }}
    >
      <ul className={cn("flex flex-col h-full flex-1", className)} {...props}>
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
      className={cn("grid  gap-x-3 pl-8 pr-10 py-4 ", props.className)}
      style={{ gridTemplateColumns }}
    >
      {children}
    </li>
  );
}

/**
 * This component is used to automatically map rows and process the array through pagination, filtering and sorting.
 * @params sortField Determines which object field will be used to sort the array
 * @example
 * { "A-Z": "profile.first_name",
      "Z-A": "profile.first_name" };
 * The following prop will access `data.profile.first_name` name and use it on the sort comparator function local compare 
 * @params renderRows Determines which object field will be used to sort the array 
 * Wrapper over the map function which returns the processed data
 */
function Rows<T = unknown>({
  data,
  sortField,
  renderRows,
}: {
  data?: T[];
  sortField?: Record<keyof typeof sortingFns, string>;
  renderRows?: (data: T, index: number) => ReactElement;
}) {
  const { sort, setIsEmpty } = useTable();

  const processedData = useMemo(() => {
    if (!data) return undefined;
    if (!sort || !sortField) return data;
    /**
     * Let's break down the comparator function access
     * `sortingFns` is an object which contains comparator functions
     * `sortingFns[sort]` will access the function according to the sort type the user selected. The function returned will need a string parameter that is used to access the values inside the data object. This value can also be nested using string formatting e.g. `profille.first_name`.
     * `sortField[sort]` will access the access data taken from the props the user has given.
     */
    const value = toSorted(data, sortingFns[sort](sortField[sort]));
    return value;
  }, [data, sortField, sort]);

  useEffect(() => {
    if (!processedData) return;
    setIsEmpty(processedData.length === 0);
  }, [processedData, setIsEmpty]);

  return renderRows && processedData?.map((data, i) => renderRows(data, i));
}

function Content({
  children,
  ...props
}: {
  children: ReactNode;
} & React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <div className="flex-1 min-h-[27rem] bg-white border-[1px] border-slate-200  pb-4 rounded-md">
      <ScrollArea {...props} className={cn("h-0 min-h-full ", props.className)}>
        <div className="">{children}</div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

const sorterValues = ["A-Z", "Z-A"] as const;
/**
 * Table sorter component
 */
function Sorter() {
  const { sort, setSort } = useTable();
  const [sortIndex, setSortIndex] = useState(0);

  const handleChangeSort = () => {
    const newValue = sortIndex + 1 >= sorterValues.length ? 0 : sortIndex + 1;
    setSortIndex(newValue);
    setSort(sorterValues[newValue]);
  };

  return (
    <div
      className="bg-white border-lighter border-[1px] w-fit flex gap-1 items-center px-4 py-1 rounded-md hover:bg-slate-100 hoverable-short"
      onClick={handleChangeSort}
    >
      <i className="bx bx-sort-alt-2 text-xl"></i>
      <p>Sort {sort}</p>
    </div>
  );
}

export default { Row, Rows, Container, Head, Content, Sorter };

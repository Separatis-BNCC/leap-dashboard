import { cn } from "@/lib/utils";

type Props = {
  page: "Statistics" | "Replacement Class";
  setPage: React.Dispatch<
    React.SetStateAction<"Replacement Class" | "Statistics">
  >;
};

export default function ClassMiscNavigation({ page, setPage }: Props) {
  return (
    <div className="grid grid-cols-2 place-items-center border-border border-b pb-3">
      <p
        className={cn(
          "text-light relative after:content-[''] after:absolute after:left-0 after:right-0 after:h-[0.375rem] after:rounded-t-lg after:w-full after:top-7 transition-all duration-100 after:transition-all after:duration-100",
          page === "Replacement Class"
            ? "text-dark after:bg-highlight "
            : "cursor-pointer hover:text-dark/50"
        )}
        onClick={() => setPage("Replacement Class")}
      >
        Replacement Class
      </p>
      <p
        className={cn(
          "text-light relative after:content-[''] after:absolute after:left-0 after:right-0 after:h-[0.375rem] after:rounded-t-lg after:w-full after:top-7 transition-all duration-100 after:transition-all after:duration-100",
          page === "Statistics"
            ? "text-dark after:bg-highlight "
            : "cursor-pointer hover:text-dark/50"
        )}
        onClick={() => setPage("Statistics")}
      >
        Statistics
      </p>
    </div>
  );
}

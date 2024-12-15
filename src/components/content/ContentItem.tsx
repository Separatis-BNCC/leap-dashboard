import { HTMLAttributes, useState } from "react";

import { cn } from "@/lib/utils";
import { Content } from "@/lib/types";
import useContentMutation from "@/hooks/content/useContentMutation";
import { LoadingSpinner } from "../ui/LoadingSpinner";

export default function ContentItem({
  contentItem,
  isSelected,
  ...props
}: {
  contentItem: Content;
  sessionId: number;
  isSelected: boolean;
} & HTMLAttributes<HTMLDivElement>) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteMutation } = useContentMutation();

  const handleDelete = () => {
    if (!contentItem.id) return;
    setIsDeleting(true);
    deleteMutation.mutate(String(contentItem.id), {
      onError: () => setIsDeleting(false),
    });
  };

  return (
    <div
      {...props}
      className={cn(
        "flex group border border-border rounded-md py-2 px-2 bg-white items-center transition-all duration-100 cursor-pointer gap-4",
        isSelected ? "border-highlight" : "hover:border-dark/25 "
      )}
    >
      <i
        className={cn(
          "bx bx-link text-lg bg-dark text-white h-full aspect-square rounded-md p-1 flex items-center justify-center  transition-all duration-100 cursor-pointer",
          isSelected ? "hover:bg-highlight/80 bg-highlight" : "hover:bg-dark/80"
        )}
        onClick={() => window.open(contentItem.url, "_blank")}
      ></i>
      <p className="flex-1">{contentItem.desc}</p>
      <div className="h-full aspect-square rounded-md p-1 flex items-center justify-center hover:bg-border transition-all duration-100 cursor-pointer bg-white border-border border ">
        {isDeleting ? (
          <LoadingSpinner />
        ) : (
          <i
            className={cn("bx bx-trash text-lg text-dark ")}
            onClick={handleDelete}
          ></i>
        )}
      </div>
    </div>
  );
}

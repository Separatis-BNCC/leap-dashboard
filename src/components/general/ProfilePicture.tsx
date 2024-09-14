import { cn } from "@/lib/utils";
import Skeleton from "react-loading-skeleton";

type Props = {
  isLoading?: boolean;
};

export default function ProfilePicture({
  isLoading,
  ...props
}: Props & React.HTMLAttributes<HTMLImageElement>) {
  if (isLoading) {
    return (
      <Skeleton
        containerClassName="row-span-2"
        height={"2.25rem"}
        width={"2.25rem"}
      />
    );
  }
  return (
    <img
      {...props}
      className={cn(
        "h-9 object-cover aspect-square rounded-full overflow-hidden",
        props.className
      )}
      src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt=""
    />
  );
}

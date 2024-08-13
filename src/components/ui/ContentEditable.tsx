import { cn } from "@/lib/utils";
import { HTMLAttributes, useEffect, useMemo, useRef, useState } from "react";
import Skeleton, { SkeletonProps } from "react-loading-skeleton";
import { LoadingSpinner } from "./LoadingSpinner";

type Props = {
  value?: string;
  isLoading?: boolean;
  isMutating?: boolean;
  containerClassName?: string;
  skeletonProps?: SkeletonProps;
  onMutate?: (value: string, complete: () => void) => void;
};

export default function ContentEditableInput({
  isMutating,
  isLoading,
  onMutate,
  skeletonProps,
  ...props
}: Props & HTMLAttributes<HTMLDivElement>) {
  const valueRef = useRef<HTMLDivElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  // Becomes true when the user hover overs the `X` and `V` button
  const [isHoveringOverCTA, setIsHoveringOverCTA] = useState(false);
  const initial = useRef<string | undefined>(undefined);

  useEffect(() => {
    // Inject initial value
    if (initial.current === undefined) {
      initial.current = props.value;
    }

    if (valueRef.current) valueRef.current.textContent = props.value || "";
  }, [props.value]);

  const handleSave = () => {
    if (isMutating) return;
    // Get the new value
    const newVal = String(valueRef.current?.textContent);

    // Trigger mutation callback
    console.log("TRIGGER");
    if (onMutate) onMutate(newVal, completeLoading);

    // Use the mutated value as the new initial value.
    initial.current = newVal;
  };

  const handleClose = () => {
    if (isMutating) return;

    // Set back to initial value of cancel
    if (valueRef.current && initial.current) {
      valueRef.current.textContent = initial.current;
    }

    setIsFocused(false);
  };

  const identifier = useMemo(() => {
    return `content-editable-input-${Math.random()
      .toString()
      .replace(".", "")}`;
  }, []);

  const completeLoading = () => {
    setIsFocused(false);
    // Remove focus
    valueRef.current?.blur();
  };

  if (isLoading)
    return (
      <Skeleton
        {...skeletonProps}
        className={cn(props.className, skeletonProps?.className)}
      />
    );

  return (
    <div className={cn("relative", props.containerClassName)}>
      <div
        {...props}
        contentEditable
        className={cn(
          "break-all hover:bg-slate-50 transition-all duration-200 ",
          identifier,
          props.className
        )}
        ref={valueRef}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          if (isHoveringOverCTA) return;
          setIsFocused(false);
        }}
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          e.preventDefault();
          handleSave();
        }}
      ></div>

      <i
        className={cn(
          "bx bx-x absolute text-xl bg-white border-[1px] border-slate-400 w-7 flex items-center justify-center aspect-square rounded-sm right-0 opacity-0 invisible transition-[background] duration-100 cursor-pointer hover:bg-slate-100 ",
          isFocused && "opacity-100 visible"
        )}
        // Call mutation value on mutate
        onClick={handleClose}
        onMouseEnter={() => setIsHoveringOverCTA(true)}
        onMouseLeave={() => setIsHoveringOverCTA(false)}
      ></i>
      <div
        className={cn(
          " absolute text-xl bg-white border-[1px] border-slate-400 w-7 flex items-center justify-center aspect-square rounded-sm right-9 opacity-0 invisible transition-[background] duration-100 hover:bg-slate-100 cursor-pointer",
          isFocused && "opacity-100 visible"
        )}
        onClick={handleSave}
        onMouseEnter={() => setIsHoveringOverCTA(true)}
        onMouseLeave={() => setIsHoveringOverCTA(false)}
      >
        {isMutating ? (
          <LoadingSpinner />
        ) : (
          <i className="bx bx-check text-xl"></i>
        )}
      </div>
    </div>
  );
}

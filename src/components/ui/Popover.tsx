import useClickOutside from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";
import {
  HTMLAttributes,
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

type PopoverContextValues = {
  isOpen: boolean;
  shouldOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isolate?: boolean;
  open?: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const PopoverContext = createContext<PopoverContextValues | null>(null);

export function usePopover() {
  const context = useContext(PopoverContext);
  if (!context)
    throw new Error("usePopover must be used inside of it's Provider's scope");
  return context;
}

function Container({
  children,
  isolate = false,
  open,
  onOpenChange = () => {},
  ...props
}: {
  children: ReactNode;
  isolate?: boolean;
  open?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
} & HTMLAttributes<HTMLDivElement>) {
  const [isOpen, setIsOpen] = useState(false);
  const id = useMemo(() => Math.random().toString().replace(".", "-"), []);

  useClickOutside(() => {
    setIsOpen(false);
    onOpenChange(false);
  }, [`.popover-container-${id}`]);

  // If the user passes in the open prop then turn the popover into a controlled component by having it follow the `open` value.
  const shouldOpen = typeof open === "boolean" ? open : isOpen;

  return (
    <PopoverContext.Provider
      value={{ shouldOpen, isOpen, setIsOpen, isolate, open, onOpenChange }}
    >
      <div
        {...props}
        className={cn(
          `relative popover-container popover-container-${id}`,
          props.className
        )}
      >
        {children}
      </div>
    </PopoverContext.Provider>
  );
}

function Trigger({
  children,
  ref,
  disabled,
  ...props
}: {
  children: ReactNode;
  disabled?: boolean;
  ref?: React.LegacyRef<HTMLDivElement>;
} & HTMLAttributes<HTMLDivElement>) {
  const { setIsOpen, onOpenChange } = usePopover();

  return (
    <div
      {...props}
      className={cn("cursor-pointer", props.className)}
      ref={ref}
      onClick={() => {
        if (disabled) return;
        setIsOpen((current) => !current);
        onOpenChange((current) => !current);
      }}
    >
      {children}
    </div>
  );
}

function Content({
  children,
  ...props
}: {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>) {
  const { shouldOpen, isolate, setIsOpen, onOpenChange } = usePopover();

  return (
    <>
      <div
        {...props}
        className={cn(
          "popover-container absolute scale-95 left-0 top-0 invisible z-[100] transition-all duration-200 opacity-0 translate-y-[-0.25rem]",
          shouldOpen && "scale-100 visible opacity-100 translate-y-0",
          props.className
        )}
      >
        {children}
      </div>
      {isolate && shouldOpen && (
        <div
          className="fixed inset-0 z-[50] bg-transparent"
          onClick={() => {
            setIsOpen(false);
            onOpenChange(false);
          }}
        ></div>
      )}
    </>
  );
}

export default { Container, Trigger, Content };

import useClickOutside from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";
import {
  HTMLAttributes,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

type PopoverContextValues = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
  ...props
}: {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>) {
  const [isOpen, setIsOpen] = useState(false);
  useClickOutside(() => {
    setIsOpen(false);
  }, [".popover-container"]);

  return (
    <PopoverContext.Provider value={{ isOpen, setIsOpen }}>
      <div
        {...props}
        className={cn("relative popover-container", props.className)}
      >
        {children}
      </div>
    </PopoverContext.Provider>
  );
}

function Trigger({
  children,
  ...props
}: {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>) {
  const { setIsOpen } = usePopover();

  return (
    <div
      {...props}
      className={cn("cursor-pointer", props.className)}
      onClick={() => setIsOpen((current) => !current)}
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
  const { isOpen } = usePopover();

  return (
    <div
      {...props}
      className={cn(
        "popover-container absolute scale-95 left-0 top-0 invisible z-[100] transition-all duration-200 opacity-0 translate-y-[-0.25rem]",
        isOpen && "scale-100 visible opacity-100 translate-y-0",
        props.className
      )}
    >
      {children}
    </div>
  );
}

export default { Container, Trigger, Content };

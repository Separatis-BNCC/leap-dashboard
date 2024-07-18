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
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isolate?: boolean;
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
  ...props
}: {
  children: ReactNode;
  isolate?: boolean;
} & HTMLAttributes<HTMLDivElement>) {
  const [isOpen, setIsOpen] = useState(false);
  const id = useMemo(() => Math.random().toString().replace(".", "-"), []);

  useClickOutside(() => {
    setIsOpen(false);
  }, [`.popover-container-${id}`]);

  return (
    <PopoverContext.Provider value={{ isOpen, setIsOpen, isolate }}>
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
  const { setIsOpen } = usePopover();

  return (
    <div
      {...props}
      className={cn("cursor-pointer", props.className)}
      ref={ref}
      onClick={() => {
        if (disabled) return;
        setIsOpen((current) => !current);
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
  const { isOpen, isolate, setIsOpen } = usePopover();

  return (
    <>
      <div
        {...props}
        className={cn(
          "popover-container absolute scale-95 left-0 top-0 invisible z-[100] transition-[opacity,transform] duration-200 opacity-0 translate-y-[-0.25rem]",
          isOpen && "scale-100 visible opacity-100 translate-y-0",
          props.className
        )}
      >
        {children}
      </div>
      {isolate && isOpen && (
        <div
          className="fixed inset-0 z-[50] bg-transparent"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}

export default { Container, Trigger, Content };

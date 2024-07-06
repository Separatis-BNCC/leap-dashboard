import { cn } from "@/lib/utils";
import {
  Dispatch,
  useState,
  ReactNode,
  createContext,
  useContext,
  HTMLAttributes,
  ReactElement,
} from "react";

type TRollDownContextValues = {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
};

const RollDownContext = createContext<TRollDownContextValues | null>(null);

export function useRollDown() {
  const context = useContext(RollDownContext);
  if (!context)
    throw new Error("useRollDown must be used inside of it's Provider's scope");
  return context;
}

type Props = {
  children: ReactNode;
  openByDefault?: boolean;
};

function Container({ children, openByDefault = false }: Props) {
  const [isOpen, setIsOpen] = useState(openByDefault);

  return (
    <RollDownContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </RollDownContext.Provider>
  );
}

function Trigger({
  children,
  disabled,
  render,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  disabled?: boolean;
  children?: ReactNode;
  render: (value: boolean) => ReactElement;
}) {
  const { setIsOpen, isOpen } = useRollDown();

  return (
    <div
      {...props}
      onClick={(e) => {
        if (disabled) return;
        setIsOpen((cur) => !cur);

        if (!props.onClick) return;
        props.onClick(e);
      }}
    >
      {render(isOpen)}
    </div>
  );
}

function Content({ children }: { children: ReactNode }) {
  const { isOpen } = useRollDown();

  return (
    <div
      className={cn(
        "grid grid-rows-[0fr] transition-all duration-500",
        isOpen && "grid-rows-[1fr]"
      )}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

export default { Container, Trigger, Content };

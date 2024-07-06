import { HTMLAttributes, ReactNode } from "react";

import { ReactNode, createContext, useContext } from "react";

type PopoverContextValues = {};

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
  return (
    <PopoverContext.Provider value={{}}>
      <div {...props}>{children}</div>
    </PopoverContext.Provider>
  );
}

function Trigger({
  children,
  ...props
}: {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>;
}

function Content({
  children,
  ...props
}: {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>;
}

export default { Container, Trigger, Content };

import { ReactNode } from "react";
import { ScrollArea } from "./ScrollArea";

type Props = {
  children: ReactNode;
  // Numbers will get turned into px
  paddingY?: number | string;
  paddingX?: number | string;
};

/**
 * Used to give dialogs ability to overscroll when the viewport height gets too short.
 */
export default function DialogScrollArea({
  children,
  paddingX,
  paddingY = "6rem",
}: Props) {
  return (
    <ScrollArea
      className="bg-white p-8 w-full max-w-[75rem] rounded-md [&>div>div]:!block [&>div>div]:h-full"
      style={{
        height: `calc(100%-${paddingY}${
          typeof paddingY === "number" ? "px" : ""
        })`,
      }}
    >
      <div className="flex flex-col h-full">{children}</div>
    </ScrollArea>
  );
}

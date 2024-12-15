import { useEffect } from "react";

export default function useClickOutside(
  callback: (e: MouseEvent) => void,
  ignoreClassNames: string[]
) {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        ignoreClassNames.some((ignoreClassName) =>
          (e.target as HTMLDivElement).closest(ignoreClassName)
        )
      )
        return;
      callback(e);
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);
}

import { useEffect } from "react";

export default function useClickOutside(
  callback: (e: MouseEvent) => void,
  dependencies: string[]
) {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dependencies.some((dependency) =>
          (e.target as HTMLDivElement).closest(dependency)
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

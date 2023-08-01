import { useEffect, useRef, RefObject } from "react";

export const useClickOutside = (cb: () => void): RefObject<HTMLDivElement> => {
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (domRef.current && !domRef.current.contains(e.target as Node)) cb();
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return domRef;
};

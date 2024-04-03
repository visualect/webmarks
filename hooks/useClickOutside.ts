import { useEffect, useRef, RefObject } from "react";

export const useClickOutside = (cb: () => void): RefObject<HTMLDivElement> => {
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      if (domRef.current && !domRef.current.contains(e.target as Node)) cb();
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);


    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);

    };
  });

  return domRef;
};

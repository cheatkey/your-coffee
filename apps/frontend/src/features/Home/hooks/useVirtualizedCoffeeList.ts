import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

export const useVirtualizedCoffeeList = (coffeeItems: any[]) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const virtualizer = useVirtualizer({
    count: coffeeItems.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 200,
  });

  const virtualItems = virtualizer.getVirtualItems();

  return { virtualizer, virtualItems, containerRef };
};

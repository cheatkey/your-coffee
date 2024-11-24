import React from "react";
import { CoffeeItem } from "@/types/graphql/generated";
import CoffeeCard from "@/components/CoffeeCard";
import { VirtualItem, Virtualizer } from "@tanstack/react-virtual";

interface CoffeeListProps {
  virtualizer: Virtualizer<HTMLDivElement, Element>;
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
  virtualItems: VirtualItem[];
  coffeeItems: CoffeeItem[];
  onCardClick: (id: number) => void;
  loading: boolean;
}

const CoffeeList = ({
  virtualizer,
  containerRef,
  virtualItems,
  coffeeItems,
  onCardClick,
  loading,
}: CoffeeListProps) => {
  return (
    <div
      className="overflow-y-auto"
      ref={containerRef}
      style={{ height: "calc(100vh - 61px - 90px)" }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: "relative",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full"
          style={{
            transform: `translateY(${virtualItems[0]?.start ?? 0}px)`,
          }}
        >
          {virtualItems.map((virtualRow) => {
            const coffee = coffeeItems[virtualRow.index];
            return (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={(node) => virtualizer.measureElement(node)}
              >
                {coffee && (
                  <CoffeeCard
                    coffee={coffee}
                    onClick={() => onCardClick(coffee.id!)}
                  />
                )}
              </div>
            );
          })}

          {virtualItems.length === 0 && loading === false && (
            <p className="flex justify-center pt-12 text-center text-gray-600 font-medium text-lg">
              찾으시는 조건의 커피가 없어요.
              <br />
              다른 필터를 선택해주세요!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoffeeList;

import React from "react";
import { cn } from "../lib/utils";
import { CoffeeItem } from "@/types/graphql/generated";
import { getScoreColor } from "@/features/Detail/utils/score";

interface CoffeeCardProps {
  coffee: CoffeeItem;
  onClick: () => void;
}

const CoffeeCard = ({ coffee, onClick }: CoffeeCardProps) => {
  const extracted =
    "bg-card text-card-foreground rounded-lg shadow-sm p-4 cursor-pointer border-b-[1px] border-gray-100";
  return (
    <div className={extracted} onClick={onClick}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="font-semibold">{coffee.name}</h2>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {coffee.desc ?? "-"}
          </p>
        </div>
        <span className="text-2xl">{coffee.origin1}</span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">{coffee.price}$</span>
        <span
          className={cn(
            "px-2 py-1 rounded-full text-sm text-white",
            getScoreColor(coffee.rating ?? 0)
          )}
        >
          {coffee.rating}점
        </span>
      </div>
      <p className="text-xs text-muted-foreground mb-2">
        roasted by{" "}
        {[coffee.roaster, coffee.locCountry].filter(Boolean).join(",")}
      </p>
      <div className="flex flex-wrap gap-2">
        {coffee.tags?.map((v) => (
          <p key={v?.id} className="bg-gray-100 rounded-sm text-xs px-2 py-1">
            {v?.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CoffeeCard;

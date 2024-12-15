import React from "react";
import { useDataContext } from "@/app/dashboard/DataProvider";
import Swimlane from "@/app/dashboard/Swimlane";

import { Card} from "@/app/dashboard/Card";

const CardPool: React.FC = () => {
  const { cards, activeSubcategory } = useDataContext();

  // Filter cards based on active subcategory
  const filteredCards = cards.filter(
    (card) => card.subCategory === activeSubcategory
  );

  // Group cards by swimLane
  const swimLaneGroups = filteredCards.reduce((acc, card) => {
    acc[card.swimLane] = acc[card.swimLane] || [];
    acc[card.swimLane].push(card);
    return acc;
  }, {} as Record<string, Card[]>);

  return (
    <div className="space-y-4">
      {Object.entries(swimLaneGroups).map(([swimLane, cards]) => (
        <Swimlane key={swimLane} title={swimLane}>
          {cards.map((card) => (
            <div
              key={card.id}
              className="w-full h-20 bg-accent text-accent-foreground rounded-lg flex items-center justify-center"
            >
              {card.content}
            </div>
          ))}
        </Swimlane>
      ))}
    </div>
  );
};

export default CardPool;

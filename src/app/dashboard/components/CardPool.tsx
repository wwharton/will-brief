"use client";

import React from "react";
import { useDataContext } from "@/app/dashboard/providers/DataProvider";
import Swimlane from "@/app/dashboard/components/Swimlane";
import Card from "@/app/dashboard/components/CardComponent";
import { useNavigationContext } from "@/app/dashboard/providers/NavigationProvider";
import { useDialogContext } from "@/app/dashboard/providers/DialogProvider";

import { ICard } from "@/app/dashboard/ICard";

const CardPool: React.FC = () => {
  const { cards } = useDataContext();
  const { activeCategory, activeSubcategory } = useNavigationContext();
  const { openDialog } = useDialogContext();

  const filteredCards = cards.filter((card) => card.subCategory === activeSubcategory);
  const swimLaneGroups = filteredCards.reduce((acc, card) => {
    acc[card.swimlane] = acc[card.swimlane] || [];
    acc[card.swimlane].push(card);
    return acc;
  }, {} as Record<string, ICard[]>);

  return (
    <div className="p-4 h-full">
      {activeSubcategory && <div className="text-center text-lg font-semibold mb-6">{activeSubcategory}</div>}
      <div className="h-full w-full overflow-x-auto flex space-x-4 pb-8">
        {Object.entries(swimLaneGroups).map(([swimlane, cards]) => (
          <Swimlane
            key={swimlane}
            title={swimlane}
            category={activeCategory || ""}
            subCategory={activeSubcategory || ""}
          >
            {cards.map((card) => (
              <Card
                key={card.id}
                id={card.id}
                content={card.content}
                onEdit={() => openDialog("update", card)}
                onDelete={() => openDialog("delete", card)}
              />
            ))}
          </Swimlane>
        ))}
      </div>
    </div>
  );
};

export default CardPool;

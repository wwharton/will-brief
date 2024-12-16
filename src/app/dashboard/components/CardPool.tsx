"use client";

import React from "react";
import { useDataContext } from "@/app/dashboard/providers/DataProvider";
import Swimlane from "@/app/dashboard/components/Swimlane";
import { ICard } from "@/app/dashboard/ICard";
import Card from "@/app/dashboard/components/CardComponent"; // Import the updated Card component

import { useNavigationContext } from "../providers/NavigationProvider";

const CardPool: React.FC = () => {
  const { cards } = useDataContext();
  const { activeCategory, activeSubcategory } = useNavigationContext();

  // Filter cards based on the active subcategory
  const filteredCards = cards.filter(
    (card) => card.subCategory === activeSubcategory
  );

  // Derive swimlanes dynamically based on the cards' swimLane property
  const swimLaneGroups = filteredCards.reduce((acc, card) => {
    acc[card.swimLane] = acc[card.swimLane] || [];
    acc[card.swimLane].push(card);
    return acc;
  }, {} as Record<string, ICard[]>);

  return (
    <div className="p-4 h-full">
      {/* Active Subcategory Header */}
      {activeSubcategory && (
        <div className="text-center text-lg font-semibold mb-6">
          {activeSubcategory}
        </div>
      )}

      {/* Swimlane Container */}
      <div className="h-full w-full overflow-x-auto flex space-x-4 pb-8">
        {Object.entries(swimLaneGroups).map(([swimLane, cards]) => (
          <Swimlane key={swimLane} title={swimLane} category={activeCategory || ''} subCategory={activeSubcategory || ''}>
            {cards.map((card) => (
              <Card
                key={card.id}
                id={card.id}
                content={card.content}
                // type={card.type}
              />
            ))}
          </Swimlane>
        ))}
      </div>
    </div>
  );
};

export default CardPool;

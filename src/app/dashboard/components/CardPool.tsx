"use client";

import React from "react";
import { useDataContext } from "@/app/dashboard/providers/DataProvider";
import DroppableSwimLane from "@/app/dashboard/components/DroppableSwimLane";
import DraggableCard from "@/app/dashboard/components/DraggableCard";
import { useNavigationContext } from "@/app/dashboard/providers/NavigationProvider";
import { useDialogContext } from "@/app/dashboard/providers/DialogProvider";
import { ICard } from "@/app/dashboard/ICard";
import NewSwimLane from "@/app/dashboard/components/NewSwimLane";
import OmniHelp from "@/app/dashboard/components/OmniHelp";


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
    <div className="light p-4 pb-4 h-full ">
      {activeSubcategory && (
        <div className="text-center text-xl font-bold mb-6">{activeSubcategory}</div>
      )}
      <div className="h-full flex space-x-6 pb-8 overflow-x-auto overflow-y-auto" style={{ padding: "20px" }}>
        {Object.entries(swimLaneGroups).map(([swimlane, cards]) => (
          <DroppableSwimLane
            key={swimlane}
            title={swimlane}
            category={activeCategory || ""}
            subCategory={activeSubcategory || ""}
          >
            {cards.map((card) => (
              <DraggableCard
                key={card.id}
                card={card}
                data-card-id={card.id}
                onEdit={() => openDialog("update", card)}
                onDelete={() => openDialog("delete", card)}
              />
            ))}
          </DroppableSwimLane>
        ))}
        <NewSwimLane activeCategory={activeCategory || ""} activeSubcategory={activeSubcategory || ""} />
      </div>
      <OmniHelp viewName="CardPool" />
    </div>
  );
};

export default CardPool;
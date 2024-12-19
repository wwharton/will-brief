"use client";

import React, { useEffect } from "react";
import { useDataContext } from "@/app/dashboard/providers/DataProvider";
import DroppableSwimLane from "@/app/dashboard/components/DroppableSwimLane";
import DraggableCard from "@/app/dashboard/components/DraggableCard";
import { useNavigationContext } from "@/app/dashboard/providers/NavigationProvider";
import { useDialogContext } from "@/app/dashboard/providers/DialogProvider";
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { ICard } from "@/app/dashboard/ICard";

const CardPool: React.FC = () => {
  const { cards, updateCard } = useDataContext();
  const { activeCategory, activeSubcategory } = useNavigationContext();
  const { openDialog } = useDialogContext();

  const filteredCards = cards.filter((card) => card.subCategory === activeSubcategory);
  const swimLaneGroups = filteredCards.reduce((acc, card) => {
    acc[card.swimlane] = acc[card.swimlane] || [];
    acc[card.swimlane].push(card);
    return acc;
  }, {} as Record<string, ICard[]>);

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const droppedCardId = source.data.cardId as string;
        const targetSwimlane = location.current.dropTargets[0]?.data?.swimlane as string;
        if (!droppedCardId || !targetSwimlane) {
          console.log('Invalid drop', droppedCardId, targetSwimlane);
          return; 
        }
  
        // Update the card's swimlane and lexKey
        const droppedCard = cards.find((card) => card.id === droppedCardId);
        console.log('dropped card', droppedCard);
        if (droppedCard) {
          const newLexKey = droppedCard.lexKey.replace(/(?<=:\w+:)\w+/, targetSwimlane);
  
          updateCard(droppedCardId, {
            swimlane: targetSwimlane,
            lexKey: newLexKey,
          });
        }
      },
    });
  }, [cards, updateCard]);
  

  return (
    <div className="p-4 h-full">
      {activeSubcategory && <div className="text-center text-lg font-semibold mb-6">{activeSubcategory}</div>}
      <div className="h-full w-full overflow-x-auto flex space-x-4 pb-8">
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
                id={card.id}
                title={card.title}
                content={card.content}
                data-card-id={card.id} // Add data attribute for monitor identification
                onEdit={() => openDialog("update", card)}
                onDelete={() => openDialog("delete", card)}
              />
            ))}
          </DroppableSwimLane>
        ))}
      </div>
    </div>
  );
};

export default CardPool;

import React, { useState } from "react";
import { useDataContext } from "@/app/dashboard/DataProvider";
import Swimlane from "@/app/dashboard/Swimlane";
import CreateCard from "@/app/dashboard/CreateCard";
import { ICard } from "@/app/dashboard/ICard";
import Card from "@/app/dashboard/CardComponent"; // Import the updated Card component

const CardPool: React.FC = () => {
  const { cards, updateCard, activeSubcategory } = useDataContext();
  const [swimLanes, setSwimLanes] = useState<string[]>(["Swimlane 1", "Swimlane 2"]);

  const filteredCards = cards.filter(
    (card) => card.subCategory === activeSubcategory
  );

  const swimLaneGroups = filteredCards.reduce((acc, card) => {
    acc[card.swimLane] = acc[card.swimLane] || [];
    acc[card.swimLane].push(card);
    return acc;
  }, {} as Record<string, ICard[]>);

  const handleAddSwimlane = () => {
    const newSwimlaneName = `Swimlane ${swimLanes.length + 1}`;
    setSwimLanes([...swimLanes, newSwimlaneName]);
  };

  const handleEditCard = (id: string) => {
    console.log(`Edit card ${id}`);
  };

  const handleDeleteCard = (id: string) => {
    console.log(`Delete card ${id}`);
  };

  return (
    <div className="p-4">
      {activeSubcategory && (
        <div className="text-center text-lg font-semibold mb-6">
          {activeSubcategory}
        </div>
      )}
      <div className="flex space-x-4 overflow-x-auto">
        {swimLanes.map((swimLane) => (
          <Swimlane
            key={swimLane}
            title={swimLane}
          >
            {swimLaneGroups[swimLane]?.map((card) => (
              <Card
                key={card.id}
                id={card.id}
                content={card.content}
                onEdit={() => handleEditCard(card.id)}
                onDelete={() => handleDeleteCard(card.id)}
              />
            ))}
            <CreateCard swimLane={swimLane} subCategory={activeSubcategory || ""} />
          </Swimlane>
        ))}
        <Swimlane isTerminus onAddSwimlane={handleAddSwimlane} />
      </div>
    </div>
  );
};

export default CardPool;

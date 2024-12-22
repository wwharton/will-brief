"use client";

import React from "react";
import { useDataContext } from "@/app/dashboard/providers/DataProvider";
import CardComponent from "@/app/dashboard/components/CardComponent";
import { useDialogContext } from "@/app/dashboard/providers/DialogProvider";

const CardsView: React.FC = () => {
  const { cards } = useDataContext();
  const { openDialog } = useDialogContext();

  return (
    <div className="p-6 bg-background text-foreground">
        <h1 className="text-3xl font-bold mb-6">All Cards</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cards.map((card) => (
            <CardComponent 
                key={card.id} 
                title={card.title} 
                content={card.content} 
                onEdit={() => openDialog("update", card)}
                onDelete={() => openDialog("delete", card)}
            />
            ))}
        </div>
    </div>
  );
};

export default CardsView;
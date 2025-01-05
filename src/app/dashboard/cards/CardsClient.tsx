"use client";

import React from "react";
import { useDataContext } from "@/app/dashboard/providers/DataProvider";
import Card from "@/app/dashboard/components/CardComponent";
import { useDialogContext } from "@/app/dashboard/providers/DialogProvider";
import OmniHelp from "@/app/dashboard/components/OmniHelp";

const CardsClient: React.FC = () => {
  const { cards } = useDataContext();
  const { openDialog } = useDialogContext();

  return (
    <div className="p-6 bg-background relative min-h-screen">
      <h1 className="text-3xl font-bold mb-6">All Cards</h1>
      <div className="light grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-16">
        {cards.map((card) => (
          <Card 
            key={card.id} 
            title={card.title} 
            content={card.content} 
            onEdit={() => openDialog("update", card)}
            onDelete={() => openDialog("delete", card)}
          />
        ))}
      </div>
      <OmniHelp viewName="Cards" />
    </div>
  );
};

export default CardsClient;


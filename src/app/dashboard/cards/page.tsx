"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useDataContext } from "@/app/dashboard/components/providers/DataProvider";
import Card from "@/app/dashboard/components/ui/cards/CardComponent";
import { useDialogContext } from "@/app/dashboard/components/providers/DialogProvider";
import { useSearch } from "@/app/dashboard/components/providers/SearchProvider";
import OmniHelp from "@/app/dashboard/components/ui/OmniHelp";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

const Cards: React.FC = () => {
  const { cards } = useDataContext();
  const { openDialog } = useDialogContext();
  const { searchCards, updateIndex } = useSearch();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    updateIndex();
  }, [cards, updateIndex]);

  const filteredCardIds = useMemo(() => {
    return searchCards(searchQuery);
  }, [searchCards, searchQuery]);

  const filteredCards = useMemo(() => {
    return cards.filter(card => filteredCardIds.includes(card.id));
  }, [cards, filteredCardIds]);

  return (
    <div className="p-6 bg-background relative min-h-screen">
      <div className="mb-6 space-y-4">
        <h1 className="text-3xl font-bold">All Cards</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search cards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 max-w-md"
          />
        </div>
      </div>
      <div className="light grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-16">
        {filteredCards.map((card) => (
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

export default Cards;


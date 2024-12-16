"use client";

import React, { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { ICard } from "@/app/dashboard/ICard";
import { initialCards } from "@/app/dashboard/data";

interface Category {
  category: string;
  items: string[];
}

interface DataContextType {
  categories: Category[];
  cards: ICard[];
  addCard: (card: ICard) => void;
  updateCard: (id: string, updatedCard: Partial<ICard>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cards, setCards] = useState<ICard[]>(initialCards);

  const categories = useMemo(() => {
    const categoryMap: Record<string, Set<string>> = {};

    cards.forEach((card) => {
      if (!categoryMap[card.category]) {
        categoryMap[card.category] = new Set();
      }
      categoryMap[card.category].add(card.subCategory);
    });

    return Object.entries(categoryMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([category, subCategories]) => ({
        category,
        items: Array.from(subCategories).sort((a, b) => a.localeCompare(b)),
      }));
  }, [cards]);

  const addCard = (card: ICard) => setCards((prev) => [...prev, card]);

  const updateCard = (id: string, updatedCard: Partial<ICard>) => {
    setCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, ...updatedCard } : card))
    );
  };

  return (
    <DataContext.Provider value={{ categories, cards, addCard, updateCard }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};

"use client";

import React, { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { ICard } from "@/app/dashboard/ICard";
import { initialCards } from "@/app/dashboard/data";
import { sub } from "date-fns";

interface Category {
  category: string;
  items: string[];
}

interface DataContextType {
  categories: Category[];
  subcategories: string[];
  cards: ICard[];
  swimlanes: string[];
  createCard: (cardData: Partial<ICard>) => void;
  updateCard: (id: string, updatedCard: Partial<ICard>) => void;
  deleteCard: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cards, setCards] = useState<ICard[]>(initialCards);

  // Compute categories and subcategories dynamically based on cards
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

  const subcategories = useMemo(() => {
    const subcategorySet = new Set<string>();
    cards.forEach((card) => {
      subcategorySet.add(card.subCategory);
    });
    return Array.from(subcategorySet).sort((a, b) => a.localeCompare(b));
  }, [cards]);

  const swimlanes = useMemo(() => {
    const swimlaneSet = new Set<string>();
    cards.forEach((card) => {
      swimlaneSet.add(card.swimlane);
    });
    return Array.from(swimlaneSet).sort((a, b) => a.localeCompare(b));
  }, [cards]);


  // Create a new card
  const createCard = (cardData: Partial<ICard>) => {
    const newCard: ICard = { id: crypto.randomUUID(), ...cardData };
    setCards((prev) => [...prev, newCard]);
  };

  // Update an existing card
  const updateCard = (id: string, updatedCard: Partial<ICard>) => {
    setCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, ...updatedCard } : card))
    );
  };

  // Delete a card
  const deleteCard = (id: string) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  return (
    <DataContext.Provider value={{ categories, subcategories, swimlanes, cards, createCard, updateCard, deleteCard }}>
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

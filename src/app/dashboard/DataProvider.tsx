"use client";

import React, { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { ICard } from "@/app/dashboard/ICard";

interface Category {
  category: string;
  items: string[];
}

interface DataContextType {
  categories: Category[];
  activeCategory: Category | null;
  setActiveCategory: (category: Category | null) => void;
  activeSubcategory: string | null;
  setActiveSubcategory: (subcategory: string | null) => void;
  cards: ICard[];
  addCard: (card: ICard) => void;
  updateCard: (id: string, updatedCard: Partial<ICard>) => void;
}

const initialCards: ICard[] = [
  {
    id: "1",
    category: "1 - End State",
    subCategory: "Define Success",
    swimLane: "Swimlane 1",
    content: "Customer can see their order status",
    type: "bullet",
  },
  {
    id: "2",
    category: "2 - API",
    subCategory: "Endpoints",
    swimLane: "Swimlane 1",
    content: "GET /order/status",
    type: "endpoint",
  },
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cards, setCards] = useState<ICard[]>(initialCards);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);

  // Dynamically compute categories and subcategories from cards
  const categories = useMemo(() => {
    const categoryMap: Record<string, Set<string>> = {};

    cards.forEach((card) => {
      if (!categoryMap[card.category]) {
        categoryMap[card.category] = new Set();
      }
      categoryMap[card.category].add(card.subCategory);
    });

    // Sort categories and subcategories lexicographically
    return Object.entries(categoryMap)
      .sort(([catA], [catB]) => catA.localeCompare(catB))
      .map(([category, subCategories]) => ({
        category,
        items: Array.from(subCategories).sort((a, b) => a.localeCompare(b)),
      }));
  }, [cards]);

  const addCard = (card: ICard) => {
    setCards((prev) => [...prev, card]);
  };

  const updateCard = (id: string, updatedCard: Partial<ICard>) => {
    setCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, ...updatedCard } : card))
    );
  };

  return (
    <DataContext.Provider
      value={{
        categories,
        activeCategory,
        setActiveCategory,
        activeSubcategory,
        setActiveSubcategory,
        cards,
        addCard,
        updateCard,
      }}
    >
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

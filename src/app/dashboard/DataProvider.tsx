"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Card } from "@/app/dashboard/Card";

interface Category {
  category: string;
  items: string[];
}

interface DataContextType {
  categories: Category[];
  activeSubcategory: string | null;
  setActiveSubcategory: (subcategory: string | null) => void;
  cards: Card[];
  addCard: (card: Card) => void;
  updateCard: (id: string, updatedCard: Partial<Card>) => void;
}

const initialCategories: Category[] = [
  { category: "End State", items: ["Define Success", "KPIs"] },
  { category: "Project Analysis", items: ["SWOT Analysis", "Timeline"] },
  { category: "Possible CoAs", items: ["Option A", "Option B"] },
  { category: "CoA", items: ["Selected Plan"] },
  { category: "Plan", items: ["Execution Steps", "Resources"] },
];

const initialCards: Card[] = [
  {
    id: "1",
    category: "End State",
    subCategory: "Define Success",
    swimLane: "Swimlane 1",
    content: "Achieve operational success",
  },
  {
    id: "2",
    category: "Project Analysis",
    subCategory: "SWOT Analysis",
    swimLane: "Swimlane 2",
    content: "Evaluate strengths and weaknesses",
  },
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);

  const addCard = (card: Card) => {
    setCards((prev) => [...prev, card]);
  };

  const updateCard = (id: string, updatedCard: Partial<Card>) => {
    setCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, ...updatedCard } : card))
    );
  };

  return (
    <DataContext.Provider
      value={{
        categories,
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

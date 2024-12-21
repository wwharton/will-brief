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
  subcategories: string[];
  cards: ICard[];
  groupedCards: Record<string, Record<string, Record<string, ICard[]>>>;
  swimlanes: string[];
  createCard: (cardData: Partial<ICard>) => void;
  updateCard: (id: string, updatedCard: Partial<ICard>) => void;
  deleteCard: (id: string) => void;
  reRankCard: (sourceCardId: string, targetCardId: string, edge: "top" | "bottom") => void; // New method
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

  const groupedCards = cards.reduce<
    Record<string, Record<string, Record<string, ICard[]>>>
  >((acc, card) => {
    if (!acc[card.category]) acc[card.category] = {};
    if (!acc[card.category][card.subCategory]) acc[card.category][card.subCategory] = {};
    if (!acc[card.category][card.subCategory][card.swimlane])
      acc[card.category][card.subCategory][card.swimlane] = [];
    acc[card.category][card.subCategory][card.swimlane].push(card);
    return acc;
  }, {});

  // const lexKey = (card: ICard) => `${card.category}:${card.subCategory}:${card.swimlane}`;

  // Create a new card
  const createCard = (cardData: Partial<ICard>) => {
    const newCard: ICard = {
      id: crypto.randomUUID(),
      category: cardData.category || "Default Category",
      subCategory: cardData.subCategory || "Default SubCategory",
      swimlane: cardData.swimlane || "Default Swimlane",
      title: cardData.title || "Untitled",
      content: cardData.content || "",
      parent: cardData.parent || undefined,
      type: cardData.type || "bullet",
      rank: cards.length * 100
    };
  
    setCards((prev) => sortCards([...prev, newCard]));
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

  // I want a function that will sort cards based on Category -> SubCategory -> Swimlane -> Rank
  const sortCards = (cards: ICard[]) => {
    return cards.sort((a, b) => {
      if (a.category !== b.category) {
        return a.category.localeCompare(b.category);
      }
      if (a.subCategory !== b.subCategory) {
        return a.subCategory.localeCompare(b.subCategory);
      }
      if (a.swimlane !== b.swimlane) {
        return a.swimlane.localeCompare(b.swimlane);
      }
      return a.rank - b.rank;
    });
  }

  /**
   * Re-rank a card based on its drop position relative to a target card.
   * @param sourceCardId - ID of the card being moved.
   * @param targetCardId - ID of the card on which the source card is dropped.
   * @param edge - 'top' or 'bottom' indicating drop position relative to target.
   */
  const reRankCard = (sourceCardId: string, targetCardId: string, edge: "top" | "bottom") => {
    console.log("Re-ranking card", sourceCardId, "relative to", targetCardId, "at", edge);
    setCards((prevCards) => {
      const sourceCard = prevCards.find(card => card.id === sourceCardId);
      const targetCard = prevCards.find(card => card.id === targetCardId);

      if (!sourceCard || !targetCard) {
        console.warn("Source or target card not found.");
        return prevCards;
      }

      // Ensure both cards are in the same swimlane
      const targetSwimlane = targetCard.swimlane;

      const swimlaneCards = prevCards
        .filter(card => card.swimlane === targetSwimlane && card.id !== sourceCardId)
        .sort((a, b) => a.rank - b.rank);

      // Find the position of the target card
      const targetIndex = swimlaneCards.findIndex(card => card.id === targetCardId);

      if (targetIndex === -1) {
        console.warn("Target card not found in its swimlane.");
        return prevCards;
      }

      let newRank: number;

      if (edge === "top") {
        console.log('detected edge top')
        if (targetIndex === 0) {
          // No card above, set rank to target rank - 100
          console.log('no card above, set rank to target rank - 100')
          newRank = targetCard.rank - 100;
        } else {
          console.log('card above, set rank to average of target and above card')
          const aboveCard = swimlaneCards[targetIndex - 1];
          newRank = (aboveCard.rank + targetCard.rank) / 2;
          console.log('newRank', newRank)
        }
      } else if (edge === "bottom") {
        console.log('detected edge bottom')
        if (targetIndex === swimlaneCards.length - 1) {
          // No card below, set rank to target rank + 100
          newRank = targetCard.rank + 100;
        } else {
          const belowCard = swimlaneCards[targetIndex + 1];
          newRank = (targetCard.rank + belowCard.rank) / 2;
        }
      } else {
        console.warn("Invalid edge value.");
        return prevCards;
      }

      // Optional: Handle cases where newRank is too close to adjacent ranks
      // This could involve reassigning ranks to maintain gaps
      const updatedCards = prevCards.map(card => 
        card.id === sourceCardId ? { ...card, swimlane: targetSwimlane, rank: newRank } : card
      );
      // then sort cards
      return sortCards(updatedCards);
    });
  };

  return (
    <DataContext.Provider value={{ categories, subcategories, swimlanes, cards, groupedCards, createCard, updateCard, deleteCard, reRankCard }}>
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

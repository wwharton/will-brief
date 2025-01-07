"use client";

import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { useDataContext } from '@/app/dashboard/providers/DataProvider';
import { InvertedIndex, createInvertedIndex, searchCards as searchCardsUtil } from '@/app/dashboard/providers/searchUtils';

interface SearchContextType {
  searchCards: (query: string) => string[];
  updateIndex: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { cards } = useDataContext();
  const [invertedIndex, setInvertedIndex] = useState<InvertedIndex>({});

  const updateIndex = useCallback(() => {
    const newIndex = createInvertedIndex(cards);
    setInvertedIndex(newIndex);
  }, [cards]);

  const searchCards = useCallback((query: string): string[] => {
    return searchCardsUtil(query, cards, invertedIndex);
  }, [invertedIndex, cards]);

  const value = useMemo(() => ({
    searchCards,
    updateIndex,
  }), [searchCards, updateIndex]);

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
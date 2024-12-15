"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Category {
  category: string;
  items: string[];
}

interface DataContextType {
  categories: Category[];
  activeSubcategory: string | null;
  setActiveSubcategory: (subcategory: string | null) => void;
  updateCategory: (category: string, items: string[]) => void;
}

const initialCategories: Category[] = [
  { category: "End State", items: ["Define Success", "KPIs"] },
  { category: "Project Analysis", items: ["SWOT Analysis", "Timeline"] },
  { category: "Possible CoAs", items: ["Option A", "Option B"] },
  { category: "CoA", items: ["Selected Plan"] },
  { category: "Plan", items: ["Execution Steps", "Resources"] },
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);

  const updateCategory = (category: string, items: string[]) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.category === category ? { ...cat, items } : cat
      )
    );
  };

  return (
    <DataContext.Provider
      value={{ categories, activeSubcategory, setActiveSubcategory, updateCategory }}
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

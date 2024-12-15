"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface NavigationContextType {
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
  activeSubcategory: string | null;
  setActiveSubcategory: (subcategory: string | null) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);

  return (
    <NavigationContext.Provider
      value={{ activeCategory, setActiveCategory, activeSubcategory, setActiveSubcategory }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigationContext must be used within a NavigationProvider");
  }
  return context;
};

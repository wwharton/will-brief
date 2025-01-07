"use client";

import React from "react";
import { useNavigationContext } from "@/app/dashboard/providers/NavigationProvider";
import DialogContainer from "@/app/dashboard/containers/DialogContainer";
import CardPool from "@/app/dashboard/components/cards/CardPool";

const MainWindowContainer: React.FC = () => {
  const { activeSubcategory } = useNavigationContext();

  return (
    <>
      {activeSubcategory ? (
        <CardPool />
      ) : (
        <div className="text-center text-lg font-bold">Select a subcategory from the sidebar to begin.</div>
      )}
      <DialogContainer />
    </>
  );
};

export default MainWindowContainer;

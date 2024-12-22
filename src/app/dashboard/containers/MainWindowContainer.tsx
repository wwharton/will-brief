"use client";

import React from "react";
import { useNavigationContext } from "@/app/dashboard/providers/NavigationProvider";
import DialogContainer from "@/app/dashboard/containers/DialogContainer";
import CardPool from "@/app/dashboard/components/CardPool";
import DocumentView from "@/app/dashboard/components/views/DocumentView";
import DiagramView from "@/app/dashboard/components/views/DiagramView";
import PresentationView from "@/app/dashboard/components/views/PresentationView";
import CardsView from "@/app/dashboard/components/views/CardsView";

const DefaultView = ({ activeSubcategory }: { activeSubcategory: string | null }) =>
  activeSubcategory ? (
    <CardPool />
  ) : (
    <div className="text-center text-lg font-bold">Select a subcategory from the sidebar to begin.</div>
  );

// Map active views to components
const viewComponents: Record<string, React.FC<{ activeSubcategory?: string | null }>> = {
  Presentation: PresentationView,
  Document: DocumentView,
  Diagram: DiagramView,
  Cards: CardsView,
};

const MainWindowContainer: React.FC = () => {
  const { activeSubcategory, activeView } = useNavigationContext();
  const ViewComponent = viewComponents[activeView || "Edit"] || DefaultView;

  return (
    <>
      <ViewComponent activeSubcategory={activeSubcategory} />
      <DialogContainer />
    </>
  );
};

export default MainWindowContainer;

"use client";

import React from "react";
import { useNavigationContext } from "@/app/dashboard/providers/NavigationProvider";
import CardPool from "@/app/dashboard/components/CardPool";

// Dummy components for different views
const PresentationView = () => <div className="text-center text-lg font-bold">Presentation View</div>;
const DocumentView = () => <div className="text-center text-lg font-bold">Document View</div>;
const DiagramView = () => <div className="text-center text-lg font-bold">Diagram View</div>;
const DefaultView = ({ activeSubcategory }: { activeSubcategory: string | null }) => (
  activeSubcategory ? <CardPool /> : <div className="text-center text-lg font-bold">Select a subcategory from the sidebar to begin.</div>
);

// Mapping activeView to corresponding components
const viewComponents: Record<string, React.FC<{ activeSubcategory?: string | null }>> = {
  Presentation: PresentationView,
  Document: DocumentView,
  Diagram: DiagramView,
};

const MainWindowContainer: React.FC = () => {
  const { activeSubcategory, activeView } = useNavigationContext();

  // Get the appropriate component or fallback to DefaultView
  const ViewComponent = viewComponents[activeView || "Edit"] || DefaultView;

  return <ViewComponent activeSubcategory={activeSubcategory} />;
};

export default MainWindowContainer;

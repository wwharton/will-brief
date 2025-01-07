"use client";

import React, { useState } from "react";
import SidebarHeader from "@/app/dashboard/components/ui/sidebar/SidebarHeader";
import SidebarNavigation from "@/app/dashboard/components/ui/sidebar/SidebarNavigation";
import SidebarDesignFiles from "@/app/dashboard/components/ui/sidebar/SidebarDesignFiles";
import SidebarViews from "@/app/dashboard/components/ui/sidebar/SidebarViews";
import SidebarActions from "@/app/dashboard/components/ui/sidebar/SidebarActions";
import { useDataContext } from "@/app/dashboard/components/providers/DataProvider";
import { useNavigationContext } from "@/app/dashboard/components/providers/NavigationProvider";

const Sidebar: React.FC = () => {
  const { categories, exportCards, importCards } = useDataContext();
  const { setActiveCategory, setActiveSubcategory } = useNavigationContext();
  const [importJson, setImportJson] = useState<string>("");
  const [isImportExportOpen, setIsImportExportOpen] = useState<boolean>(false);

  const handleExport = () => {
    const json = exportCards();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cards.txt";
    a.click();
  };

  const handleImport = () => {
    importCards(importJson);
    setImportJson("");
  };

  return (
    <div className="h-full p-4 bg-background text-foreground flex flex-col border-r border-border">
      <SidebarHeader />
      <SidebarNavigation 
        setActiveCategory={setActiveCategory}
        setActiveSubcategory={setActiveSubcategory}
      />
      <div className="flex-grow overflow-y-auto">
        <SidebarDesignFiles categories={categories} />
      </div>
      <div className="mt-auto space-y-4">
        <SidebarViews 
          setActiveCategory={setActiveCategory}
          setActiveSubcategory={setActiveSubcategory}
        />
        <SidebarActions 
          isImportExportOpen={isImportExportOpen}
          setIsImportExportOpen={setIsImportExportOpen}
          importJson={importJson}
          setImportJson={setImportJson}
          handleExport={handleExport}
          handleImport={handleImport}
        />
      </div>
    </div>
  );
};

export default Sidebar;

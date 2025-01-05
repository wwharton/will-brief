"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useDataContext } from "@/app/dashboard/providers/DataProvider";
import { useNavigationContext } from "@/app/dashboard/providers/NavigationProvider";
import { Plus, File, Layers, Presentation, ChevronDown, ChevronUp } from 'lucide-react';
import { useDialogContext } from "@/app/dashboard/providers/DialogProvider";

import Link from "next/link"; // Import Link from Next.js


const Sidebar: React.FC = () => {
  const { categories, exportCards, importCards } = useDataContext();
  const { activeSubcategory, setActiveCategory, setActiveSubcategory } = useNavigationContext();
  const { openDialog } = useDialogContext();
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
      {/* Header */}
      <div className="flex items-center justify-between text-lg font-semibold mb-6">
        <span>Will-Brief Demo</span>
      </div>

      {/* Button Row */}
      <div className="flex justify-between items-center text-sm space-x-2 mb-6">
        <Link href="/dashboard/cards" passHref>
          <Button 
            // as="a" // Ensure Button acts as an anchor
            variant="outline" 
            className="flex items-center space-x-1"
            onClick={() => { 
              setActiveCategory(null);
              setActiveSubcategory(null);
            }}
          >
            <Layers className="h-4 w-4" />
            <span>Cards</span>
          </Button>
        </Link>
      </div>

      {/* Project File */}
      <div className="flex justify-between items-center text-sm mb-1">
        <div className="flex items-center space-x-2">
          <File className="h-4 w-4" />
          <h3 className="text-lg font-semibold">Design Files</h3>
        </div>
      </div>

      {/* Accordion */}
      <Accordion type="multiple" className="w-full overflow-y-auto mb-6">
        {categories.map((category, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger>{category.category}</AccordionTrigger>
            <AccordionContent>

              <ul className="py-2 space-y-1">
                {category.items.map((item) => (
                  <Link key={item} href={`/dashboard`} passHref>
                    <li
                      key={item}
                      className={`rounded-md p-2 cursor-pointer ${
                        activeSubcategory === item
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent hover:text-accent-foreground"
                      }`}
                      onClick={() => {
                        setActiveCategory(category.category);
                        setActiveSubcategory(item);
                      }}
                    >
                      {item}
                    </li>
                  </Link>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Design Presentation Section */}
      <div className="flex justify-between items-center text-sm mb-1">
        <div className="flex items-center space-x-2">
          <Presentation className="h-4 w-4" />
          <h3 className="text-lg font-semibold">View</h3>
        </div>
      </div>

      <ul className="space-y-1">
        {["Presentation", "Document", "Diagram"].map((item) => (
          <Link key={item} href={`/dashboard/${item.toLowerCase()}`} passHref>
            <li
              className="py-2 px-4 hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer"
              onClick={() => {
                setActiveCategory(null);
                setActiveSubcategory(null);
              }}
            >
              {item}
            </li>
          </Link>
        ))}
      </ul>

      {/* New Card Button */}
      <div className="mt-auto space-y-2">
        <Button
          onClick={() => {openDialog("new")}}
          className="w-full"
        >
          <Plus className="mr-2 h-5 w-5" />
          New Card
        </Button>

        {/* Import / Export Section */}
        <div>
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setIsImportExportOpen(!isImportExportOpen)}
          >
            <span>Import / Export Cards</span>
            {isImportExportOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
          {isImportExportOpen && (
            <div className="mt-2 space-y-2">
              <Button
                onClick={handleExport}
                className="w-full"
              >
                Export Cards
              </Button>
              <textarea
                value={importJson}
                onChange={(e) => setImportJson(e.target.value)}
                placeholder="Paste JSON here to import cards"
                className="w-full h-20 p-2 mb-2 border rounded"
              />
              <Button
                onClick={handleImport}
                className="w-full"
              >
                Import Cards
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
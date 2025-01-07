"use client";

import React, { useMemo, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useDataContext } from "@/app/dashboard/components/providers/DataProvider";
import MermaidComponent from "@/app/dashboard/diagram/MermaidComponent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import OmniHelp from "@/app/dashboard/components/ui/OmniHelp";

const Diagram: React.FC = () => {
  const { cards } = useDataContext();
  const [showDiagram, setShowDiagram] = useState(true);

  const mermaidMarkdown = useMemo(() => {
    let mermaidString = "graph TD\n";
  
    // Create a set to keep track of added virtual elements
    const addedElements = new Set();
  
    // Sort cards by Category, Subcategory, Swimlane, and rank
    const sortedCards = [...cards].sort((a, b) => {
      if (a.category !== b.category) return a.category.localeCompare(b.category);
      if (a.subCategory !== b.subCategory) return a.subCategory.localeCompare(b.subCategory);
      if (a.swimlane !== b.swimlane) return a.swimlane.localeCompare(b.swimlane);
      return a.rank - b.rank;
    });
  
    sortedCards.forEach((card) => {
      const { id, parent, title, category, subCategory, swimlane } = card;
  
      const escapedTitle = title.replace(/</g, "&lt;");
      const truncatedTitle =
        escapedTitle.length > 30
          ? `${escapedTitle.slice(0, 30)}...`
          : escapedTitle;
  
      // Create valid node IDs by replacing spaces and special characters
      const categoryId = category.replace(/\s+/g, '_');
      const subCategoryId = subCategory.replace(/\s+/g, '_');
      const swimlaneId = swimlane.replace(/\s+/g, '_');
      const cardId = id.replace(/\s+/g, '_');
  
      // Add virtual elements for Category, Subcategory, and Swimlane
      if (!addedElements.has(categoryId)) {
        mermaidString += `    ${categoryId}(["${category}"])\n`;
        addedElements.add(categoryId);
      }
      if (!addedElements.has(subCategoryId)) {
        mermaidString += `    ${subCategoryId}(["${subCategory}"])\n`;
        mermaidString += `    ${categoryId} --> ${subCategoryId}\n`;
        addedElements.add(subCategoryId);
      }
      if (!addedElements.has(swimlaneId)) {
        mermaidString += `    ${swimlaneId}(["${swimlane}"])\n`;
        mermaidString += `    ${subCategoryId} --> ${swimlaneId}\n`;
        addedElements.add(swimlaneId);
      }
  
      // Add the card itself
      mermaidString += `    ${cardId}["${truncatedTitle}"]\n`;
  
      // Link the card to its swimlane
      mermaidString += `    ${swimlaneId} --> ${cardId}\n`;
  
      // If a parent is specified, override the hierarchy link
      if (parent && parent !== "No Parent" && parent.trim() !== "") {
        const parentId = parent.replace(/\s+/g, '_');
        mermaidString += `    ${parentId} --> ${cardId}\n`;
      }
    });
  
    return mermaidString;
  }, [cards]);

  return (
    <>
    <Card className="light w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Mermaid Diagram</CardTitle>
        <div className="flex items-center space-x-2">
          <Switch
            id="diagram-switch"
            checked={showDiagram}
            onCheckedChange={setShowDiagram}
          />
          <Label htmlFor="diagram-switch">
            {showDiagram ? "Diagram" : "Markdown"}
          </Label>
        </div>
      </CardHeader>
      <CardContent>
        {showDiagram ? (
          <div className="border rounded-md p-4 bg-background">
            <MermaidComponent source={mermaidMarkdown} id="1" />
          </div>
        ) : (
          <Textarea
            value={mermaidMarkdown}
            readOnly
            className="w-full h-[400px] font-mono text-sm"
          />
        )}
      </CardContent>
    </Card>
    <OmniHelp viewName="Diagram" />
    </>
  );
};

export default Diagram;


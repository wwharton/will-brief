"use client";

import React, { useMemo, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useDataContext } from "@/app/dashboard/providers/DataProvider";
import MermaidComponent from "./MermaidComponent";

const MermaidDiagram: React.FC = () => {
  const { cards } = useDataContext();
  const [showDiagram, setShowDiagram] = useState(true); // Toggle between Markdown and Diagram

  // Generate Mermaid Markdown
  const mermaidMarkdown = useMemo(() => {
    let mermaidString = "graph TD\n";

    cards.forEach((card) => {
      const { id, parent, content } = card;

      // Escape '<' characters in content
      const escapedContent = content.replace(/</g, "&lt;");

      // Truncate content if needed
      const truncatedContent =
        escapedContent.length > 20
          ? `${escapedContent.slice(0, 20)}...`
          : escapedContent;

      // Add the card as a node
      mermaidString += `    ${id}["${truncatedContent}"]\n`;

      // Add parent-child relationship if parent is valid
      if (parent && parent !== "No Parent" && parent.trim() !== "") {
        mermaidString += `    ${parent} --> ${id}\n`;
      }
    });

    return mermaidString;
  }, [cards]);


  return (
    <div className="p-4 bg-white shadow rounded">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Mermaid Diagram</h2>
        <Button onClick={() => setShowDiagram((prev) => !prev)}>
          {showDiagram ? "Show Markdown" : "Show Diagram"}
        </Button>
      </div>
      {showDiagram ? (
        <MermaidComponent source={mermaidMarkdown} id="1"/>
      ) : (
        <Textarea
          value={mermaidMarkdown}
          readOnly
          className="w-full h-64 resize-none"
        />
      )}
    </div>
  );
};

export default MermaidDiagram;

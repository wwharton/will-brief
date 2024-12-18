"use client";

import React, { useMemo, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useDataContext } from "@/app/dashboard/providers/DataProvider";
import MermaidComponent from "./MermaidComponent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const DiagramView: React.FC = () => {
  const { cards } = useDataContext();
  const [showDiagram, setShowDiagram] = useState(true);

  const mermaidMarkdown = useMemo(() => {
    let mermaidString = "graph TD\n";

    cards.forEach((card) => {
      const { id, parent, title } = card;

      const escapedTitle = title.replace(/</g, "&lt;");
      const truncatedTitle =
        escapedTitle.length > 30
          ? `${escapedTitle.slice(0, 30)}...`
          : escapedTitle;

      mermaidString += `    ${id}["${truncatedTitle}"]\n`;

      if (parent && parent !== "No Parent" && parent.trim() !== "") {
        mermaidString += `    ${parent} --> ${id}\n`;
      }
    });

    return mermaidString;
  }, [cards]);

  return (
    <Card className="w-full">
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
  );
};

export default DiagramView;


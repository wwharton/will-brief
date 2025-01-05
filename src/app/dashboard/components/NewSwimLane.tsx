"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from 'lucide-react';
import { useDataContext } from "@/app/dashboard/providers/DataProvider";

interface NewSwimLaneProps {
  activeCategory: string;
  activeSubcategory: string;
}

const NewSwimLane: React.FC<NewSwimLaneProps> = ({ activeCategory, activeSubcategory }) => {
  const { createCard } = useDataContext();
  const [isCreating, setIsCreating] = useState(false);
  const [newLaneName, setNewLaneName] = useState("");

  const handleCreateNewLane = () => {
    if (newLaneName.trim()) {
      createCard({
        category: activeCategory,
        subCategory: activeSubcategory,
        swimlane: newLaneName,
        title: "Placeholder",
        content: "Update Me!",
        type: "bullet",
      });
      setNewLaneName("");
      setIsCreating(false);
    }
  };

  return (
    <Card className="w-[12.5vw] min-w-[250px] h-full flex flex-col rounded-none">
      <CardHeader className="flex-1 overflow-y-auto p-4 flex flex-col">
        {isCreating ? (
          <div className="space-y-4 w-full">
            <Input
              value={newLaneName}
              onChange={(e) => setNewLaneName(e.target.value)}
              placeholder="Enter lane name"
              className="mb-4"
            />
            <Button
              variant="ghost"
              className="w-full mt-4 flex items-center justify-center rounded-md hover:bg-muted"
              onClick={handleCreateNewLane}
            >
              <CardTitle>Create Lane</CardTitle>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <Button
              variant="ghost"
              className="w-full mt-4 flex items-center justify-center rounded-md"
              onClick={() => setIsCreating(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Lane
            </Button>
          </div>
        )}
      </CardHeader>
    </Card>
  );
};

export default NewSwimLane;
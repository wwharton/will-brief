import React, { ReactNode, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';

interface SwimlaneProps {
  title: string;
  children?: ReactNode;
  isTerminus?: boolean;
  onAddSwimlane?: () => void;
  onRename?: (newName: string) => void;
}

const Swimlane: React.FC<SwimlaneProps> = ({
  title,
  children,
  isTerminus = false,
  onAddSwimlane,
  onRename,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleRename = () => {
    if (newTitle.trim() && newTitle !== title) {
      onRename?.(newTitle);
    }
    setIsEditing(false);
  };

  if (isTerminus) {
    return (
      <Card className="w-[15vw] min-w-[200px]">
        <CardContent className="p-0">
          <Button
            variant="ghost"
            className="w-full h-full flex items-center justify-center p-6 hover:bg-muted"
            onClick={onAddSwimlane}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Swimlane
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-[15vw] min-w-[200px]">
      <CardHeader className="p-4">
        {isEditing ? (
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleRename}
            onKeyDown={(e) => e.key === "Enter" && handleRename()}
            className="p-1"
            autoFocus
          />
        ) : (
          <CardTitle
            className="text-lg font-bold cursor-pointer"
            onDoubleClick={() => setIsEditing(true)}
          >
            {title}
          </CardTitle>
        )}
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-4">
        {children}
      </CardContent>
    </Card>
  );
};

export default Swimlane;


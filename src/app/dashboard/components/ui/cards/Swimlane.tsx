"use client";

import React, { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { useDialogContext } from "@/app/dashboard/components/providers/DialogProvider";
import { useNavigationContext } from "@/app/dashboard/components/providers/NavigationProvider";


interface SwimlaneProps {
  title: string;
  category: string;
  subCategory: string;
  children?: ReactNode;
}

const Swimlane: React.FC<SwimlaneProps> = ({ title, children }) => {
  const { openDialog } = useDialogContext();
  const { activeCategory, activeSubcategory } = useNavigationContext();

  return (
    <Card className="w-[25vw] min-w-[200px] h-full flex flex-col rounded-none">
      <CardHeader className="p-4 flex-shrink-0">
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">{children}</div>
        <Button
          variant="ghost"
          className="w-full mt-4 flex items-center justify-center rounded-md hover:bg-muted"
          onClick={() => {openDialog("new", {
            category: activeCategory || '',
            subCategory: activeSubcategory || '',
            swimlane: title,
          })}}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Card
        </Button>
      </CardContent>
    </Card>
  );
};

export default Swimlane;

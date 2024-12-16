"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDataContext } from "@/app/dashboard/providers/DataProvider";
import { ICard } from "@/app/dashboard/ICard";

interface NewCardDialogProps {
  isOpen: boolean;
  onClose: () => void;
  cardData?: Partial<ICard>; // Partial card data to prefill the dialog
}

const NewCardDialog: React.FC<NewCardDialogProps> = ({
  isOpen,
  onClose,
  cardData = {},
}) => {
  const { createCard } = useDataContext();

  const [cardContent, setCardContent] = useState(cardData.content || "");
  const [category, setCategory] = useState(cardData.category || "");
  const [subCategory, setSubCategory] = useState(cardData.subCategory || "");
  const [swimlane, setSwimlane] = useState(cardData.swimlane || "");
  const [type, setType] = useState<ICard["type"]>(cardData.type || "bullet");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create the card with the provided data
    createCard({
      category,
      subCategory,
      swimlane,
      content: cardContent,
      type,
    });

    // Close the dialog after submission
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Card</DialogTitle>
          <DialogDescription>
            Enter the details for your new card here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Card Content */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content" className="text-right">
                Content
              </Label>
              <Textarea
                id="content"
                value={cardContent}
                onChange={(e) => setCardContent(e.target.value)}
                className="col-span-3"
              />
            </div>

            {/* Category */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="col-span-3"
              />
            </div>

            {/* SubCategory */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subCategory" className="text-right">
                SubCategory
              </Label>
              <Input
                id="subCategory"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="col-span-3"
              />
            </div>

            {/* SwimLane */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="swimlane" className="text-right">
                Swimlane
              </Label>
              <Input
                id="swimlane"
                value={swimlane}
                onChange={(e) => setSwimlane(e.target.value)}
                className="col-span-3"
              />
            </div>

            {/* Card Type */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value as ICard["type"])}
                className="col-span-3 border rounded p-2"
              >
                <option value="bullet">Bullet</option>
                <option value="table">Table</option>
                <option value="column">Column</option>
                <option value="endpoint">Endpoint</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Card</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewCardDialog;

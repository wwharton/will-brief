"use client";

import React, { useState } from "react";
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

import { useNavigationContext } from "@/app/dashboard/providers/NavigationProvider";

interface NewCardDialogProps {
  isOpen: boolean;
  onClose: () => void;
  swimLane?: string;
  type?: "bullet" | "table" | "column" | "endpoint";
}

export const useNewCardDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return { isOpen, open, close, toggle };
};

export const NewCardDialog: React.FC<NewCardDialogProps> = ({
  isOpen,
  onClose,
  swimLane,
  type = "bullet",
}) => {
  const { addCard } = useDataContext();
  const { activeCategory, activeSubcategory } = useNavigationContext();

  const [cardTitle, setCardTitle] = useState("");
  const [cardContent, setCardContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(activeCategory || "");
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    activeSubcategory || ""
  );
  const [selectedSwimLane, setSelectedSwimLane] = useState(swimLane || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create new card
    addCard({
      id: Date.now().toString(),
      category: selectedCategory,
      subCategory: selectedSubCategory,
      swimLane: selectedSwimLane,
      content: cardContent,
      type,
    });

    // Clear inputs and close the dialog
    setCardTitle("");
    setCardContent("");
    setSelectedCategory(activeCategory || "");
    setSelectedSubCategory(activeSubcategory || "");
    setSelectedSwimLane(swimLane || "");
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
            {/* Card Title */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={cardTitle}
                onChange={(e) => setCardTitle(e.target.value)}
                className="col-span-3"
              />
            </div>

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

            {/* Category Entry */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Input
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="col-span-3"
              />
            </div>

            {/* SubCategory Entry */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subCategory" className="text-right">
                SubCategory
              </Label>
              <Input
                id="subCategory"
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
                className="col-span-3"
              />
            </div>

            {/* SwimLane Entry */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="swimLane" className="text-right">
                SwimLane
              </Label>
              <Input
                id="swimLane"
                value={selectedSwimLane}
                onChange={(e) => setSelectedSwimLane(e.target.value)}
                className="col-span-3"
              />
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

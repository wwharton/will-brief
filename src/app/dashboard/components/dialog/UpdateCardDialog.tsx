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

interface UpdateCardDialogProps {
  isOpen: boolean;
  onClose: () => void;
  cardData: Partial<ICard>; // Partial card data to prefill the form
}

const UpdateCardDialog: React.FC<UpdateCardDialogProps> = ({
  isOpen,
  onClose,
  cardData,
}) => {
  const { updateCard } = useDataContext();

  const [category, setCategory] = useState(cardData?.category || "");
  const [subCategory, setSubCategory] = useState(cardData?.subCategory || "");
  const [swimlane, setSwimLane] = useState(cardData?.swimlane || "");
  const [content, setContent] = useState(cardData?.content || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cardData.id) {
      updateCard(cardData.id, { category, subCategory, swimlane, content });
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Card</DialogTitle>
          <DialogDescription>Modify the details of this card.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Content */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content" className="text-right">
                Content
              </Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
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
                SwimLane
              </Label>
              <Input
                id="swimlane"
                value={swimlane}
                onChange={(e) => setSwimLane(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCardDialog;

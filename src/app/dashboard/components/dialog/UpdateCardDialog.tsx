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

import { ICard } from "@/app/dashboard/ICard";

import { useDataContext } from "@/app/dashboard/providers/DataProvider";

interface UpdateCardDialogProps {
  isOpen: boolean;
  onClose: () => void;
  card: ICard;
  initialCategory: string;
  initialSubCategory: string;
  initialSwimLane: string;
  initialContent: string;
  // onUpdate: (updatedCard: Partial<{ category: string; subCategory: string; swimlane: string; content: string }>) => void;
}



export const useUpdateCardDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [card, setCard] = useState<ICard | null>(null);
  
    const open = () => setIsOpen(true);
    const close = () => {
      setIsOpen(false);
      setCard(null);
    };
  
    return { isOpen, open, close, card, setCard };
  };

const UpdateCardDialog: React.FC<UpdateCardDialogProps> = ({
  isOpen,
  onClose,
  card,
  initialCategory,
  initialSubCategory,
  initialSwimLane,
  initialContent,
}) => {
  const { updateCard } = useDataContext();

  const [category, setCategory] = useState(initialCategory);
  const [subCategory, setSubCategory] = useState(initialSubCategory);
  const [swimlane, setSwimLane] = useState(initialSwimLane);
  const [content, setContent] = useState(initialContent);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCard(card.id, { category, subCategory, swimlane, content });
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

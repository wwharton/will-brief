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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
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
  const { updateCard, cards } = useDataContext();

  const [category, setCategory] = useState(cardData?.category || "");
  const [subCategory, setSubCategory] = useState(cardData?.subCategory || "");
  const [swimlane, setSwimLane] = useState(cardData?.swimlane || "");
  const [title, setTitle] = useState(cardData?.title || "");
  const [content, setContent] = useState(cardData?.content || "");
  const [parent, setParent] = useState(cardData?.parent || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cardData.id) {
      updateCard(cardData.id, { category, subCategory, swimlane, content, parent });
    }
    onClose();
  };

  const truncatedContent = (text: string) => (text.length > 30 ? `${text.slice(0, 30)}...` : text);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Card</DialogTitle>
          <DialogDescription>Modify the details of this card.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Title */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
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

            {/* Parent Card */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="parent" className="text-right">
                Parent
              </Label>
              <Select
                value={parent}
                onValueChange={setParent}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select Parent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="No Parent">
                    No Parent
                  </SelectItem>
                  {cards
                    .filter((card) => card.id !== cardData.id) // Exclude the current card
                    .map((card) => (
                      <SelectItem key={card.id} value={card.id}>
                        {truncatedContent(card.content)}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
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

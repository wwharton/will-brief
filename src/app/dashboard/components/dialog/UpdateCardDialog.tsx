"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDataContext } from "@/app/dashboard/providers/DataProvider";
import TextEditor from "./TextEditor";
import SelectEditor from "./SelectEditor";
import { ICard } from "@/app/dashboard/ICard";

interface UpdateCardDialogProps {
  isOpen: boolean;
  onClose: () => void;
  cardData: Partial<ICard>;
}

const UpdateCardDialog: React.FC<UpdateCardDialogProps> = ({
  isOpen,
  onClose,
  cardData,
}) => {
  const { updateCard, cards } = useDataContext();

  const [title, setTitle] = useState(cardData?.title || "");
  const [content, setContent] = useState(cardData?.content || "");
  const [category, setCategory] = useState(cardData?.category || "");
  const [subCategory, setSubCategory] = useState(cardData?.subCategory || "");
  const [parent, setParent] = useState(cardData?.parent || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cardData.id) {
      updateCard(cardData.id, { title, content, category, subCategory, parent });
    }
    onClose();
  };

  const parentOptions = [
    { label: "No Parent", value: "No Parent" },
    ...cards
      .filter((card) => card.id !== cardData.id)
      .map((card) => ({
        label: card.title?.length > 30 ? `${card.title.slice(0, 30)}...` : card.title || "Untitled",
        value: card.id,
      })),
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Card</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Title */}
            <TextEditor id="title" label="Title" value={title} onChange={setTitle} />
            {/* Content */}
            <TextEditor
              id="content"
              label="Content"
              value={content}
              onChange={setContent}
              multiline
            />
            {/* Category */}
            <TextEditor id="category" label="Category" value={category} onChange={setCategory} />
            {/* SubCategory */}
            <TextEditor
              id="subCategory"
              label="SubCategory"
              value={subCategory}
              onChange={setSubCategory}
            />
            {/* Parent / Child Of */}
            <SelectEditor
              id="parent"
              label="Child of"
              value={parent}
              onChange={setParent}
              options={parentOptions}
            />
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

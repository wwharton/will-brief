"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDataContext } from "@/app/dashboard/providers/DataProvider";
import TextEditor from "./TextEditor";
import SelectEditor from "./SelectEditor";
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

  const [title, setTitle] = useState(cardData.title || "");
  const [content, setContent] = useState(cardData.content || "");
  const [category, setCategory] = useState(cardData.category || "");
  const [subCategory, setSubCategory] = useState(cardData.subCategory || "");
  const [swimlane, setSwimlane] = useState(cardData.swimlane || "");
  const [type, setType] = useState<ICard["type"]>(cardData.type || "bullet");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createCard({
      title,
      content,
      category,
      subCategory,
      swimlane,
      type,
    });

    onClose();
  };

  const cardTypeOptions = [
    { label: "Bullet", value: "bullet" },
    { label: "Table", value: "table" },
    { label: "Column", value: "column" },
    { label: "Endpoint", value: "endpoint" },
  ];

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
            <TextEditor id="title" label="Title" value={title} onChange={setTitle} />
            <TextEditor
              id="content"
              label="Content"
              value={content}
              onChange={setContent}
              multiline
            />
            <TextEditor id="category" label="Category" value={category} onChange={setCategory} />
            <TextEditor
              id="subCategory"
              label="SubCategory"
              value={subCategory}
              onChange={setSubCategory}
            />
            <TextEditor id="swimlane" label="Swimlane" value={swimlane} onChange={setSwimlane} />
            <SelectEditor
              id="type"
              label="Type"
              value={type}
              onChange={setType}
              options={cardTypeOptions}
            />
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

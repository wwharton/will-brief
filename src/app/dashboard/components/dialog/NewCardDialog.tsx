"use client";

import React, { useState } from "react";
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
import TextEditor from "./editors/TextEditor";
import SelectEditor from "./editors/SelectEditor";
import { ICard } from "@/app/dashboard/ICard";

interface NewCardDialogProps {
  isOpen: boolean;
  onClose: () => void;
  cardData?: Partial<ICard>; // Partial card data to prefill the dialog
}
import SearchEditor from "./editors/SearchEditor";

const NewCardDialog: React.FC<NewCardDialogProps> = ({
  isOpen,
  onClose,
  cardData = {},
}) => {
  const { createCard, categories: catObjs, subcategories, swimlanes } = useDataContext();

  const [title, setTitle] = useState(cardData.title || "");
  const [content, setContent] = useState(cardData.content || "");
  const [category, setCategory] = useState(cardData.category || "");
  const [subCategory, setSubCategory] = useState(cardData.subCategory || "");
  const [swimlane, setSwimlane] = useState(cardData.swimlane || "");
  const [type, setType] = useState<ICard["type"]>(cardData.type || "bullet");
  // const [date, setDate] = useState("");

  // // Derive options dynamically from existing cards
  const categories = Array.from(catObjs.map((category) => category.category));
  // const subCategories = Array.from(new Set(cards.map((card) => card.subCategory)));
  // const swimlanes = Array.from(new Set(cards.map((card) => card.swimlane)));

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
            <SearchEditor
              id="category"
              label="Category"
              value={category}
              onChange={setCategory}
              options={categories}
            />
            <SearchEditor
              id="subCategory"
              label="SubCategory"
              value={subCategory}
              onChange={setSubCategory}
              options={subcategories}
            />
            <SearchEditor
              id="swimlane"
              label="Swimlane"
              value={swimlane}
              onChange={setSwimlane}
              options={swimlanes}
            />
            <SelectEditor
              id="type"
              label="Type"
              value={type}
              onChange={setType}
              options={[
                { label: "Bullet", value: "bullet" },
                { label: "Table", value: "table" },
                { label: "Column", value: "column" },
                { label: "Endpoint", value: "endpoint" },
              ]}
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

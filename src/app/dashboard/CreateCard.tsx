import React, { useState } from "react";
import { useDataContext } from "@/app/dashboard/DataProvider";

interface CreateCardProps {
  swimLane: string;
  subCategory: string;
}

const CreateCard: React.FC<CreateCardProps> = ({ swimLane, subCategory }) => {
  const { addCard } = useDataContext();
  const [content, setContent] = useState("");

  const handleAddCard = () => {
    if (content.trim() === "") return;

    addCard({
      id: crypto.randomUUID(),
      category: "Custom", // Default category, can be updated later
      subCategory,
      swimLane,
      content,
    });

    setContent(""); // Clear input after adding the card
  };

  return (
    <div className="w-full h-20 flex items-center justify-between p-2 bg-muted rounded-lg">
      <input
        type="text"
        placeholder="New card content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-grow p-2 rounded-md border border-input text-sm"
      />
      <button
        onClick={handleAddCard}
        className="ml-2 p-2 bg-primary text-primary-foreground rounded-md"
      >
        Add
      </button>
    </div>
  );
};

export default CreateCard;

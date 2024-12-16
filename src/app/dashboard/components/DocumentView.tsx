"use client";

import React, { useState } from "react";
import { useDataContext } from "@/app/dashboard/providers/DataProvider";

const DocumentView: React.FC = () => {
  const { cards, updateCard } = useDataContext();
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");

  // Group cards by their category and subcategory
  const groupedCards = cards.reduce<Record<string, Record<string, { id: string; content: string }[]>>>(
    (acc, card) => {
      if (!acc[card.category]) {
        acc[card.category] = {};
      }
      if (!acc[card.category][card.subCategory]) {
        acc[card.category][card.subCategory] = [];
      }
      acc[card.category][card.subCategory].push({ id: card.id, content: card.content });
      return acc;
    },
    {}
  );

  const handleDoubleClick = (cardId: string, currentContent: string) => {
    setEditingCardId(cardId);
    setEditedContent(currentContent);
  };

  const handleSave = (cardId: string) => {
    if (editedContent.trim()) {
      updateCard(cardId, { content: editedContent });
    }
    setEditingCardId(null);
    setEditedContent("");
  };

  const handleCancel = () => {
    setEditingCardId(null);
    setEditedContent("");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Document View</h1>
      <div className="space-y-6">
        {Object.entries(groupedCards).map(([category, subcategories]) => (
          <div key={category}>
            <h2 className="text-xl font-semibold">{category}</h2>
            <div className="ml-4 space-y-4">
              {Object.entries(subcategories).map(([subcategory, cards]) => (
                <div key={subcategory}>
                  <h3 className="text-lg font-medium">{subcategory}</h3>
                  <ul className="list-disc ml-8">
                    {cards.map(({ id, content }) => (
                      <li key={id} className="mb-2">
                        {editingCardId === id ? (
                          <div className="flex items-center space-x-2">
                            <input
                              className="p-2 border rounded w-full"
                              value={editedContent}
                              onChange={(e) => setEditedContent(e.target.value)}
                            />
                            <button
                              className="text-sm px-2 py-1 bg-green-500 text-white rounded"
                              onClick={() => handleSave(id)}
                            >
                              Save
                            </button>
                            <button
                              className="text-sm px-2 py-1 bg-gray-300 text-black rounded"
                              onClick={handleCancel}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <span
                            onDoubleClick={() => handleDoubleClick(id, content)}
                            className="cursor-pointer"
                          >
                            {content}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentView;

"use client";

import React, { useState } from "react";
import { useDataContext } from "@/app/dashboard/providers/DataProvider";

const RenderCategory: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div>
    <h2 className="text-xl font-semibold">{title}</h2>
    <div className="ml-4 space-y-4">{children}</div>
  </div>
);

const RenderSubCategory: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div>
    <h3 className="text-lg font-medium">{title}</h3>
    <ul className="list-disc ml-8">{children}</ul>
  </div>
);

const RenderSwimlane: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <li>
    <div className="font-semibold">{title}</div>
    <ul className="list-disc ml-8">{children}</ul>
  </li>
);

const RenderTitleContent: React.FC<{
  id: string;
  title: string;
  content: string;
  onDoubleClick: () => void;
  editing: boolean;
  editedContent: string;
  onContentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
}> = ({
  id,
  title,
  content,
  onDoubleClick,
  editing,
  editedContent,
  onContentChange,
  onSave,
  onCancel,
}) => (
  <li key={id} className="mb-2">
    {editing ? (
      <div className="flex items-center space-x-2">
        <input
          className="p-2 border rounded w-full"
          value={editedContent}
          onChange={onContentChange}
        />
        <button className="text-sm px-2 py-1 bg-green-500 text-white rounded" onClick={onSave}>
          Save
        </button>
        <button className="text-sm px-2 py-1 bg-gray-300 text-black rounded" onClick={onCancel}>
          Cancel
        </button>
      </div>
    ) : (
      <span onDoubleClick={onDoubleClick} className="cursor-pointer">
        <span className="font-bold">{title}:</span> {content}
      </span>
    )}
  </li>
);

const DocumentView: React.FC = () => {
  const { groupedCards, updateCard } = useDataContext();
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");

  const lexKeySort = (a: { lexKey: string }, b: { lexKey: string }) =>
    a.lexKey.localeCompare(b.lexKey);

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
          <RenderCategory key={category} title={category}>
            {Object.entries(subcategories).map(([subcategory, swimlanes]) => (
              <RenderSubCategory key={subcategory} title={subcategory}>
                {Object.entries(swimlanes).map(([swimlane, cards]) => (
                  <RenderSwimlane key={swimlane} title={swimlane}>
                    {cards.sort(lexKeySort).map(({ id, title, content }) => (
                      <RenderTitleContent
                        key={id}
                        id={id}
                        title={title}
                        content={content}
                        onDoubleClick={() => handleDoubleClick(id, content)}
                        editing={editingCardId === id}
                        editedContent={editedContent}
                        onContentChange={(e) => setEditedContent(e.target.value)}
                        onSave={() => handleSave(id)}
                        onCancel={handleCancel}
                      />
                    ))}
                  </RenderSwimlane>
                ))}
              </RenderSubCategory>
            ))}
          </RenderCategory>
        ))}
      </div>
    </div>
  );
};

export default DocumentView;

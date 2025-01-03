"use client";

import React, { useState } from "react";
import { useDataContext } from "@/app/dashboard/providers/DataProvider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import OmniHelp from "@/app/dashboard/components/views/OmniHelp";

const RenderCategory: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div>
    <h2 className="text-xl font-semibold">{title}</h2>
    <div className="ml-4 space-y-4">{children}</div>
  </div>
);

const RenderSubCategory: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-4">
    <h3 className="text-lg font-heavy mb-2">{title}</h3>
    <ul className="space-y-2">{children}</ul>
  </div>
);

const RenderSwimlane: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <li className="mb-2">
    <div className="font-semibold">{title}</div>
    <ul className="ml-4 space-y-1">{children}</ul>
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
  <li key={id} className="mb-1">
    {editing ? (
      <div className="flex items-center space-x-2">
        <Input
          value={editedContent}
          onChange={onContentChange}
          className="flex-grow"
        />
        <Button size="sm" onClick={onSave}>Save</Button>
        <Button size="sm" variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    ) : (
      <span onDoubleClick={onDoubleClick} className="cursor-pointer hover:bg-accent hover:text-accent-foreground p-1 rounded">
        <span className="font-medium">{title}:</span> {content}
      </span>
    )}
  </li>
);

const DocumentView: React.FC = () => {
  const { groupedCards, updateCard } = useDataContext();
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");

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
    <div className="light p-6 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6">Document View</h1>
      <div className="space-y-6">
        {Object.entries(groupedCards).map(([category, subcategories]) => (
          <RenderCategory key={category} title={category}>
            {Object.entries(subcategories).map(([subcategory, swimlanes]) => (
              <RenderSubCategory key={subcategory} title={subcategory}>
                {Object.entries(swimlanes).map(([swimlane, cards]) => (
                  <RenderSwimlane key={swimlane} title={swimlane}>
                    {cards.map(({ id, title, content }) => (
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
      <OmniHelp viewName="Document" />
    </div>
  );
};

export default DocumentView;


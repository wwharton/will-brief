"use client";

import React, { useRef, useEffect, useState } from "react";
import Card from "@/app/dashboard/components/CardComponent";
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { invariant } from '@/app/utils';

interface DraggableCardProps {
  id: string;
  title?: string;
  content: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const DraggableCard: React.FC<DraggableCardProps> = ({
  id,
  title,
  content,
  onEdit,
  onDelete,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current;
    invariant(el); // Ensure the ref is assigned

    return draggable({
      element: el,
      onDragStart: () => setDragging(true), // Set dragging state to true when drag starts
      onDrop: () => setDragging(false), // Set dragging state to false when drag ends
    });
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-transform duration-150 ease-in-out ${
        dragging ? "opacity-50 scale-95" : ""
      }`}
    >
      <Card
        id={id}
        title={title}
        content={content}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};

export default DraggableCard;

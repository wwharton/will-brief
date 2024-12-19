"use client";

import React, { useRef, useEffect, useState } from "react";
import Swimlane from "@/app/dashboard/components/Swimlane"; // Import the Swimlane component
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { invariant } from "@/app/utils"; // Replace or implement as needed

interface DroppableSwimlaneProps {
  title: string;
  category: string;
  subCategory: string;
  children?: React.ReactNode;
  onDrop?: (swimlaneTitle: string, droppedElement: HTMLElement | null) => void;
}

const DroppableSwimlane: React.FC<DroppableSwimlaneProps> = ({
  title,
  category,
  subCategory,
  children,
  onDrop,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return dropTargetForElements({
      element: el,
      getData: () => ({ swimlane: title }), // Surface the swimlane title
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: ({ source }) => {
        setIsDraggedOver(false);
        if (onDrop) {
          onDrop(title, source.element);
        }
      },
    });
  }, [onDrop, title]);

  return (
    <div
      ref={ref}
      className={`transition-transform duration-150 ease-in-out ${
        isDraggedOver ? "ring-2 ring-blue-500 scale-105" : ""
      }`}
    >
      <Swimlane title={title} category={category} subCategory={subCategory}>
        {children}
      </Swimlane>
    </div>
  );
};

export default DroppableSwimlane;

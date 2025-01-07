"use client";

import React, { useRef, useEffect, useState } from "react";
import Swimlane from "@/app/dashboard/components/ui/cards/Swimlane";
import {
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { invariant } from "@/app/utils";
import { useDataContext } from "@/app/dashboard/components/providers/DataProvider";
import { isCardData } from "@/app/dashboard/data";
import { ICard } from "@/app/dashboard/ICard";

interface DroppableSwimlaneProps {
  title: string;
  category: string;
  subCategory: string;
  children?: React.ReactNode;
}

const DroppableSwimlane: React.FC<DroppableSwimlaneProps> = ({
  title,
  category,
  subCategory,
  children,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const { updateCard } = useDataContext();

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return dropTargetForElements({
      element: el,
      getData: () => ({ swimlane: title }), // Surface swimlane title
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop({ source }) {
        setIsDraggedOver(false)
        if (isCardData(source.data)) {
          const sourceCard: ICard = source.data;
          const targetSwimlane = title;

          if (sourceCard.swimlane !== targetSwimlane) {
            updateCard(sourceCard.id, { swimlane: targetSwimlane });
          }
        }
    },
    });
  }, [title, updateCard]);

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

"use client";

import React, { useRef, useEffect, useState } from "react";
import Swimlane from "@/app/dashboard/components/Swimlane";
import {
  dropTargetForElements,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { invariant } from "@/app/utils";
import { useDataContext } from "../providers/DataProvider";

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
//   const { cards, updateCard } = useDataContext();

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return dropTargetForElements({
      element: el,
      getData: () => ({ swimlane: title }), // Surface swimlane title
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop({ location, self }) {
        // Check if this swimlane is the direct target of the drop
        console.log("Card dropped on swimlane:", title);
        setIsDraggedOver(false);
      },
    });
  }, [title]);

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

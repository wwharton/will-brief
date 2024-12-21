"use client";

import React, { useRef, useEffect, useState } from "react";
import Card from "@/app/dashboard/components/CardComponent";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { invariant } from "@/app/utils";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { DropIndicator } from "./DropIndicator";
import {
  attachClosestEdge,
  type Edge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { ICard } from "@/app/dashboard/ICard";
import { getCardData, isCardData } from "@/app/dashboard/data";
import { useDataContext } from "@/app/dashboard/providers/DataProvider";

interface DraggableCardProps {
  card: ICard;
  onEdit?: () => void;
  onDelete?: () => void;
}

type CardState =
  | { type: "idle" }
  | { type: "preview"; container: HTMLElement }
  | { type: "is-dragging" }
  | { type: "is-dragging-over"; closestEdge: Edge | null };

const idle: CardState = { type: "idle" };

const DraggableCard: React.FC<DraggableCardProps> = ({
  card,
  onEdit,
  onDelete,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const [state, setState] = useState<CardState>(idle);

  const { updateCard } = useDataContext();

  const { title, content, id, swimlane } = card;

  useEffect(() => {
    const element = ref.current;
    invariant(element, "DraggableCard: ref is null");

    return combine(
      draggable({
        element,
        getInitialData() {
          console.log('card', card);
          console.log('getCardData(card)', getCardData(card));
          return getCardData(card);
        }, // Provide card data as draggable data
        onDrag: () => setDragging(true),
        onDrop({ source }) {
          setState(idle);
          setDragging(false);
        },
        // onDragLeave: () => setDragging(false),
      }),
      dropTargetForElements({
        element,
        canDrop({ source }) {
          // Prevent dropping on itself
          if (source.element === element) {
            return false;
          }
          // Allow only card data to be dropped
          return isCardData(source.data);
        },
        getData({ input }) {
          const data = getCardData(card);
          return attachClosestEdge(data, {
            element,
            input,
            allowedEdges: ["top", "bottom"],
          });
        },
        getIsSticky() {
          return true;
        },
        onDragEnter({ self }) {
          const closestEdge = extractClosestEdge(self.data);
          setState({ type: "is-dragging-over", closestEdge });
        },
        onDrag({ self }) {
          const closestEdge = extractClosestEdge(self.data);

          // Only update state if the closest edge has changed
          setState((current) => {
            if (
              current.type === "is-dragging-over" &&
              current.closestEdge === closestEdge
            ) {
              return current;
            }
            return { type: "is-dragging-over", closestEdge };
          });
        },
        onDragLeave() {
          setState(idle);
          setDragging(false);
        },
        onDrop({ source }) {
          setState(idle);
          setDragging(false);

          if (isCardData(source.data)) {
            const sourceCard: any = source.data;
            const targetSwimlane = swimlane;

            if (sourceCard.swimlane !== targetSwimlane) {
              updateCard(sourceCard.id, { swimlane: targetSwimlane });
            }
          }
        },
      })
    );
  }, [id, card, updateCard, swimlane]);

  return (
    <div className="relative">
      <div
        ref={ref}
        className={`cursor-pointer transition-transform duration-150 ease-in-out ${
          dragging ? "opacity-50 scale-95" : ""
        }`}
      >
        <Card
          title={title}
          content={content}
          onEdit={onEdit}
          onDelete={onDelete}
        />
        {state.type === "is-dragging-over" && state.closestEdge ? (
          <DropIndicator edge={state.closestEdge} gap={"8px"} />
        ) : null}
      </div>
    </div>
  );
};

export default DraggableCard;

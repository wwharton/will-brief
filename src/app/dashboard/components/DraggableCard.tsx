"use client";

import React, { type HTMLAttributes, useRef, useEffect, useState } from "react";
import Card from "@/app/dashboard/components/CardComponent";
import {
    draggable,
    dropTargetForElements,
  } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { invariant } from '@/app/utils';
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { DropIndicator } from "./DropIndicator";
import {
    attachClosestEdge,
    type Edge,
    extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { ICard } from "@/app/dashboard/ICard";
import { getCardData, isCardData } from "@/app/dashboard/data";


interface DraggableCardProps {
  card: ICard;
  onEdit?: () => void;
  onDelete?: () => void;
}

type CardState =
  | {
      type: 'idle';
    }
  | {
      type: 'preview';
      container: HTMLElement;
    }
  | {
      type: 'is-dragging';
    }
  | {
      type: 'is-dragging-over';
      closestEdge: Edge | null;
    };

const stateStyles: { [Key in CardState['type']]?: HTMLAttributes<HTMLDivElement>['className'] } = {
    'is-dragging': 'opacity-40',
    };
    
const idle: CardState = { type: 'idle' };

const DraggableCard: React.FC<DraggableCardProps> = ({
  card,
  onEdit,
  onDelete,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const [state, setState] = useState<CardState>({ type: "idle" });

  const title = card.title;
  const content = card.content;
  const id = card.id;

  useEffect(() => {
    const element = ref.current;
    invariant(element);

    return combine(
        draggable({
            element,
            getInitialData() { 
                return getCardData(card)
            }, // Provide card ID as draggable data
            onDragStart: () => setDragging(true),
            onDrop: () => setDragging(false),
            }),
        dropTargetForElements({
            element,
            canDrop({ source }) {
              // not allowing dropping on yourself
              if (source.element === element) {
                return false;
              }
              // only allowing tasks to be dropped on me
              return isCardData(source.data);
            },
            getData({ input }) {
              const data = getCardData(card);
              return attachClosestEdge(data, {
                element,
                input,
                allowedEdges: ['top', 'bottom'],
              });
            },
            getIsSticky() {
              return true;
            },
            onDragEnter({ self }) {
              const closestEdge = extractClosestEdge(self.data);
              setState({ type: 'is-dragging-over', closestEdge });
            },
            onDrag({ self }) {
              const closestEdge = extractClosestEdge(self.data);
    
              // Only need to update react state if nothing has changed.
              // Prevents re-rendering.
              setState((current) => {
                if (current.type === 'is-dragging-over' && current.closestEdge === closestEdge) {
                  return current;
                }
                return { type: 'is-dragging-over', closestEdge };
              });
            },
            onDragLeave() {
              setState(idle);
            },
            onDrop() {
              setState(idle);
            },
          }),
    
        );
  }, [id]);

  return (
    <>
      <div className="relative">
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
            {state.type === "is-dragging-over" && state.closestEdge ? (
                <DropIndicator edge={state.closestEdge} gap={'8px'} />
            ) : null}
            </div>
        </div>
    </>
  );
};

export default DraggableCard;

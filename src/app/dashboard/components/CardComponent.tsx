import React from "react";
import {
  Card as ShadcnCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface CustomCardProps {
  id: string;
  title?: string;
  content: string;
  onEdit?: () => void; // Callback for editing the card
  onDelete?: () => void; // Callback for deleting the card
}

const Card: React.FC<CustomCardProps> = ({
  id,
  title,
  content,
  onEdit,
  onDelete,
}) => {
  return (
    <ShadcnCard className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {content && <CardDescription>{content}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="flex justify-end space-x-2">
          {onEdit && (
            <button
              onClick={onEdit}
              className="text-primary hover:text-primary-foreground p-1 rounded"
            >
              E
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="text-destructive hover:text-destructive-foreground p-1 rounded"
            >
              X
            </button>
          )}
        </div>
      </CardContent>
    </ShadcnCard>
  );
};

export default Card;

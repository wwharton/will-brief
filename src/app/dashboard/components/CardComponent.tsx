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
  content: string;
  description?: string;
  onEdit?: () => void; // Callback for editing the card
  onDelete?: () => void; // Callback for deleting the card
}

const Card: React.FC<CustomCardProps> = ({
  id,
  content,
  description,
  onEdit,
  onDelete,
}) => {
  return (
    <ShadcnCard className="w-full">
      <CardHeader>
        <CardTitle>{content}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
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

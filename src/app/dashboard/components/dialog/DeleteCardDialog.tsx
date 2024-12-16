"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useDataContext } from "@/app/dashboard/providers/DataProvider";
import { ICard } from "@/app/dashboard/ICard";

interface DeleteCardDialogProps {
  isOpen: boolean;
  onClose: () => void;
  card: ICard;
}

export const useDeleteCardDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [card, setCard] = useState<ICard | null>(null);
  
    const open = () => setIsOpen(true);
    const close = () => {
      setIsOpen(false);
      setCard(null);
    };
  
    return { isOpen, open, close, card, setCard };
  };
  

const DeleteCardDialog: React.FC<DeleteCardDialogProps> = ({ isOpen, onClose, card }) => {
  const { deleteCard } = useDataContext();

  const handleDelete = () => {
    deleteCard(card.id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Card</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete this card?</p>
        <DialogFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleDelete} className="text-red-600">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCardDialog;

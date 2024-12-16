"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import NewCardDialog from "@/app/dashboard/components/dialog/NewCardDialog";
import UpdateCardDialog from "@/app/dashboard/components/dialog/UpdateCardDialog";
import DeleteCardDialog from "@/app/dashboard/components/dialog/DeleteCardDialog";
import { ICard } from "@/app/dashboard/ICard";

import { useNavigationContext } from "./NavigationProvider";


// Dialog Types
type DialogType = "new" | "update" | "delete" | null;

interface DialogState {
  type: DialogType;
  card: ICard | null; // Card for update/delete or null for new
  swimlane?: string | null;
}

interface DialogContextType {
  openDialog: (type: DialogType, card?: ICard, swimlane?: string) => void;
  closeDialog: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { activeCategory, activeSubcategory } = useNavigationContext();
  const [dialogState, setDialogState] = useState<DialogState>({
    type: null,
    card: null,
    swimlane: null,
  });

  const openDialog = (type: DialogType, card: ICard | null = null, swimlane: string | null = null) => {
    setDialogState({ type, card, swimlane});
  };

  const closeDialog = () => {
    setDialogState({ type: null, card: null, swimlane: null });
  };

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}

      {/* Render Dialogs */}
      {dialogState.type === "new" && (
        <NewCardDialog 
        isOpen 
        onClose={closeDialog} 
        swimlane={dialogState.swimlane || ''}
        category={activeCategory || ""}
        subcategory={activeSubcategory || ""}
        />
      )}
      {dialogState.type === "update" && dialogState.card && (
        <UpdateCardDialog
          isOpen
          onClose={closeDialog}
          card={dialogState.card}
          initialCategory={dialogState.card.category}
          initialSubCategory={dialogState.card.subCategory}
          initialSwimLane={dialogState.card.swimlane}
          initialContent={dialogState.card.content}
        />
      )}
      {dialogState.type === "delete" && dialogState.card && (
        <DeleteCardDialog
          isOpen
          onClose={closeDialog}
          card={dialogState.card}
        />
      )}
    </DialogContext.Provider>
  );
};

export const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialogContext must be used within a DialogProvider");
  }
  return context;
};

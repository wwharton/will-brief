"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ICard } from "@/app/dashboard/ICard";

// Dialog Types
type DialogType = "new" | "update" | "delete" | null;

interface DialogState {
  type: DialogType;
  card: ICard | null; // Card for update/delete or null for new
  swimlane?: string | null;
}

interface DialogContextType {
  dialogState: DialogState;
  openDialog: (type: DialogType, card?: ICard, swimlane?: string) => void;
  closeDialog: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dialogState, setDialogState] = useState<DialogState>({
    type: null,
    card: null,
    swimlane: null,
  });

  const openDialog = (type: DialogType, card: ICard | null = null, swimlane: string | null = null) => {
    setDialogState({ type, card, swimlane });
  };

  const closeDialog = () => {
    setDialogState({ type: null, card: null, swimlane: null });
  };

  return (
    <DialogContext.Provider value={{ dialogState, openDialog, closeDialog }}>
      {children}
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

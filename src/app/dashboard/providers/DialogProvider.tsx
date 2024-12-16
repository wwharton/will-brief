"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ICard } from "@/app/dashboard/ICard";

// Dialog Types
type DialogType = "new" | "update" | "delete" | null;

interface DialogState {
  type: DialogType;
  card?: Partial<ICard>;
}

interface DialogContextType {
  dialogState: DialogState;
  openDialog: (type: DialogType, card?: Partial<ICard>) => void;
  closeDialog: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dialogState, setDialogState] = useState<DialogState>({ type: null });

  console.log(dialogState)

  const openDialog = (type: DialogType, card: Partial<ICard> = {}) => {
    setDialogState({ type, card });
  };

  const closeDialog = () => {
    setDialogState({ type: null });
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

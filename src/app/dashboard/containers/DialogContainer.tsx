"use client";

import React from "react";
import NewCardDialog from "@/app/dashboard/components/dialog/NewCardDialog";
import UpdateCardDialog from "@/app/dashboard/components/dialog/UpdateCardDialog";
import DeleteCardDialog from "@/app/dashboard/components/dialog/DeleteCardDialog";
import { useDialogContext } from "@/app/dashboard/providers/DialogProvider";
import { useNavigationContext } from "@/app/dashboard/providers/NavigationProvider";

const DialogContainer: React.FC = () => {
  const { dialogState, closeDialog } = useDialogContext();
  const { activeCategory, activeSubcategory } = useNavigationContext();

  return (
    <>
      {dialogState.type === "new" && (
        <NewCardDialog
          isOpen
          onClose={closeDialog}
          swimlane={dialogState.swimlane || ""}
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
    </>
  );
};

export default DialogContainer;

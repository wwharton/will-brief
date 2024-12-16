import React from "react";
import { useDialogContext } from "@/app/dashboard/providers/DialogProvider";
import NewCardDialog from "@/app/dashboard/components/dialog/NewCardDialog";
import UpdateCardDialog from "@/app/dashboard/components/dialog/UpdateCardDialog";
import DeleteCardDialog from "@/app/dashboard/components/dialog/DeleteCardDialog";

const DialogContainer: React.FC = () => {
  const { dialogState, closeDialog } = useDialogContext();

  switch (dialogState.type) {
    case "new":
      return <NewCardDialog isOpen onClose={closeDialog} cardData={dialogState.card || {}} />;
    case "update":
      return <UpdateCardDialog isOpen onClose={closeDialog} cardData={dialogState.card || {}} />;
    case "delete":
      return <DeleteCardDialog isOpen onClose={closeDialog} cardData={dialogState.card || {}} />;
    default:
      return null;
  }
};

export default DialogContainer;

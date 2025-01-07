import React from "react";
import { useDialogContext } from "@/app/dashboard/components/providers/DialogProvider";
import NewCardDialog from "@/app/dashboard/components/ui/dialog/NewCardDialog";
import UpdateCardDialog from "@/app/dashboard/components/ui/dialog/UpdateCardDialog";
import DeleteCardDialog from "@/app/dashboard/components/ui/dialog/DeleteCardDialog";

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

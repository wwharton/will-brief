import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { useDialogContext } from "@/app/dashboard/components/providers/DialogProvider";

interface SidebarActionsProps {
  isImportExportOpen: boolean;
  setIsImportExportOpen: (isOpen: boolean) => void;
  importJson: string;
  setImportJson: (json: string) => void;
  handleExport: () => void;
  handleImport: () => void;
}

const SidebarActions: React.FC<SidebarActionsProps> = ({
  isImportExportOpen,
  setIsImportExportOpen,
  importJson,
  setImportJson,
  handleExport,
  handleImport
}) => {
  const { openDialog } = useDialogContext();

  return (
    <div className="mt-auto space-y-2">
      <Button
        onClick={() => {openDialog("new")}}
        className="w-full"
      >
        <Plus className="mr-2 h-5 w-5" />
        New Card
      </Button>

      <div>
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsImportExportOpen(!isImportExportOpen)}
        >
          <span>Import / Export Cards</span>
          {isImportExportOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
        {isImportExportOpen && (
          <div className="mt-2 space-y-2">
            <Button
              onClick={handleExport}
              className="w-full"
            >
              Export Cards
            </Button>
            <textarea
              value={importJson}
              onChange={(e) => setImportJson(e.target.value)}
              placeholder="Paste JSON here to import cards"
              className="w-full h-20 p-2 mb-2 border rounded"
            />
            <Button
              onClick={handleImport}
              className="w-full"
            >
              Import Cards
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarActions;


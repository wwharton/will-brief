import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ICard } from '@/app/dashboard/ICard'

interface SelectEditorProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: ICard["type"]) => void;
  options: { label: string; value: string }[];
}

const SelectEditor: React.FC<SelectEditorProps> = ({
  id,
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <div className="relative">
      <Label htmlFor={id} className="text-right">
        {label}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id} className="col-span-3">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectEditor;

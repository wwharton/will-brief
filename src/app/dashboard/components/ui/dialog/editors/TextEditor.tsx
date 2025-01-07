import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface TextEditorProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean; // Whether to use a `Textarea` or `Input`
}

const TextEditor: React.FC<TextEditorProps> = ({
  id,
  label,
  value,
  onChange,
  multiline = false,
}) => {
  return (
    <div className="relative">
      <Label htmlFor={id} className="text-right">
        {label}
      </Label>
      {multiline ? (
        <Textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="col-span-3"
        />
      ) : (
        <Input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="col-span-3"
        />
      )}
    </div>
  );
};

export default TextEditor;

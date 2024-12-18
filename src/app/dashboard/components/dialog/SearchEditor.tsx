"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SearchEditorProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[]; // Array of options to suggest from
}

const SearchEditor: React.FC<SearchEditorProps> = ({
  id,
  label,
  value,
  onChange,
  options,
}) => {
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // If the input is empty, show all options
    if (showDropdown) {
      if (!value) {
        setFilteredOptions(options);
      } else {
        const matches = options.filter((option) =>
          option.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredOptions(matches);
      }
    }
  }, [value, options, showDropdown]);

  const handleSelect = (option: string) => {
    onChange(option);
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <Label htmlFor={id} className="mb-1 block">
        {label}
      </Label>
      <Input
        id={id}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // Delay to allow click
        className="w-full"
        autoComplete="off" // Disable browser autofill
        aria-autocomplete="none" // Accessibility adjustment to disable suggestions
      />
      {showDropdown && filteredOptions.length > 0 && (
        <div className="absolute z-10 w-full bg-white border border-gray-200 rounded shadow-md max-h-40 overflow-auto">
          {filteredOptions.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchEditor;

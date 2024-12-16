"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useDataContext } from "@/app/dashboard/providers/DataProvider";
import { useNavigationContext } from "@/app/dashboard/providers/NavigationProvider";
import { Plus, File, Trash2, Search, Layers, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { NewCardDialog, useNewCardDialog } from "@/app/dashboard/components/NewCardDialog";

const Sidebar: React.FC = () => {
  const { categories } = useDataContext();
  const { activeSubcategory, setActiveCategory, setActiveSubcategory } = useNavigationContext();
  const { isOpen, open, close } = useNewCardDialog();

  return (
    <div className="h-full p-4 bg-slate-900 text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between text-lg font-semibold mb-6">
        <span>JPP EDD Demo</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" className="bg-slate-900">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Button Row */}
      <div className="flex justify-between items-center text-sm space-x-2 mb-4">
        <Button size="sm" className="flex items-center space-x-1 bg-slate-900">
          <Search className="h-4 w-4" />
          <span>Jump to</span>
        </Button>
        <Button size="sm" className="flex items-center space-x-1 bg-slate-900">
          <Layers className="h-4 w-4" />
          <span>Cards</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" className="flex items-center space-x-1 bg-slate-900">
              <Trash2 className="h-4 w-4" />
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Empty Trash</DropdownMenuItem>
            <DropdownMenuItem>Restore All</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Project File */}
      <div className="flex justify-between items-center text-sm mb-6">
        <div className="flex items-center space-x-2">
          <File className="h-4 w-4" />
          <span>Design</span>
        </div>
        <Button size="icon" className="bg-slate-900">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Accordion */}
      <Accordion type="single" collapsible className="w-full flex-1 overflow-y-auto">
        {categories.map((category, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger>{category.category}</AccordionTrigger>
            <AccordionContent>
              <ul className="py-2 space-y-1">
                {category.items.map((item) => (
                    // if active category is this category, always display it as if it were hovered
                  <li
                    key={item}
                    //  if active category != category.catgory, then hover bg and text color
                    // else always be highlighted
                    className={activeSubcategory === item ? "bg-accent text-accent-foreground rounded-lg p-2" : "hover:bg-accent hover:text-accent-foreground rounded-lg p-2 cursor-pointer"}
                    onClick={() => {
                      setActiveCategory(category.category);
                      setActiveSubcategory(item);
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* New Card Button */}
      <div className="mt-auto">
        <Button
          onClick={open}
          className="w-full bg-primary text-white hover:bg-primary-hover flex items-center justify-center py-4 rounded-lg"
        >
          <Plus className="mr-2 h-5 w-5" />
          New Card
        </Button>
        <NewCardDialog
          isOpen={isOpen}
          onClose={close}
        />
      </div>
    </div>
  );
};

export default Sidebar;

"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useDataContext } from "@/app/dashboard/DataProvider";
import { Plus, File, Trash2, Search, Layers, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Sidebar: React.FC = () => {
  const { categories, setActiveSubcategory } = useDataContext();

  return (
    <div className="h-full p-4 bg-slate-900 text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between text-lg font-semibold">
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
      <div className="flex justify-between text-left items-center text-sm">
        {/* <Button variant="ghost" className="flex items-center space-x-2"> */}
                <div className="flex items-center space-x-2">

          <File className="h-4 w-4" />
          <span>Design</span>
          </div>
        {/* </Button> */}
        <Button size="icon" className="bg-slate-900">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Accordion */}
      <Accordion type="single" collapsible className="w-full">
        {categories.map((category, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger>{category.category}</AccordionTrigger>
            <AccordionContent>
              <ul className="py-2 space-y-1">
                {category.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="py-2 px-4 hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer"
                    onClick={() => setActiveSubcategory(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

    </div>
  );
};

export default Sidebar;

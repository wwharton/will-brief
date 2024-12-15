"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useDataContext } from "@/app/dashboard/DataProvider";

const Sidebar: React.FC = () => {
  const { categories, setActiveSubcategory } = useDataContext();

  return (
    <div className="w-1/5 p-4 border-r bg-[hsl(222.2,84%,4.9%)] text-[hsl(210,40%,98%)]">
      <Accordion type="single" collapsible className="w-full">
        {categories.map((category, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger>
              {category.category}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="py-2">
                {category.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="py-2 px-4 hover:bg-muted hover:text-black rounded-md cursor-pointer"
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

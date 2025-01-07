import React from "react";
import Link from "next/link";
import { File } from 'lucide-react';
import { useNavigationContext } from "@/app/dashboard/components/providers/NavigationProvider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Category {
  category: string;
  items: string[];
}

interface SidebarDesignFilesProps {
  categories: Category[];
}

const SidebarDesignFiles: React.FC<SidebarDesignFilesProps> = ({ categories }) => {
  const { activeSubcategory, setActiveCategory, setActiveSubcategory } = useNavigationContext();

  return (
    <>
      <div className="flex justify-between items-center text-sm mb-1">
        <div className="flex items-center space-x-2">
          <File className="h-4 w-4" />
          <h3 className="text-lg font-semibold">Design Files</h3>
        </div>
      </div>
      <Accordion type="multiple" className="w-full overflow-y-auto">
        {categories.map((category, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger>{category.category}</AccordionTrigger>
            <AccordionContent>
              <ul className="py-2 space-y-1">
                {category.items.map((item) => (
                  <Link key={item} href={`/dashboard`} passHref>
                    <li
                      className={`rounded-md p-2 cursor-pointer ${
                        activeSubcategory === item
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent hover:text-accent-foreground"
                      }`}
                      onClick={() => {
                        setActiveCategory(category.category);
                        setActiveSubcategory(item);
                      }}
                    >
                      {item}
                    </li>
                  </Link>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default SidebarDesignFiles;


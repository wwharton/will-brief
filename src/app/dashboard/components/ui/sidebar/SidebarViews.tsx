import React from "react";
import Link from "next/link";
import { Presentation } from 'lucide-react';

interface SidebarViewsProps {
  setActiveCategory: (category: string | null) => void;
  setActiveSubcategory: (subcategory: string | null) => void;
}

const SidebarViews: React.FC<SidebarViewsProps> = ({ 
  setActiveCategory, 
  setActiveSubcategory 
}) => {
  return (
    <>
      <div className="flex justify-between items-center text-sm mb-1">
        <div className="flex items-center space-x-2">
          <Presentation className="h-4 w-4" />
          <h3 className="text-lg font-semibold">View</h3>
        </div>
      </div>
      <ul className="space-y-1">
        {["Presentation", "Document", "Diagram"].map((item) => (
          <Link key={item} href={`/dashboard/${item.toLowerCase()}`} passHref>
            <li
              className="py-2 px-4 hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer"
              onClick={() => {
                setActiveCategory(null);
                setActiveSubcategory(null);
              }}
            >
              {item}
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default SidebarViews;


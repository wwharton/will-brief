import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Layers } from 'lucide-react';

interface SidebarNavigationProps {
  setActiveCategory: (category: string | null) => void;
  setActiveSubcategory: (subcategory: string | null) => void;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ 
  setActiveCategory, 
  setActiveSubcategory 
}) => {
  return (
    <div className="flex justify-between items-center text-sm space-x-2 mb-6">
      <Link href="/dashboard/cards" passHref>
        <Button 
          variant="outline" 
          className="flex items-center space-x-1"
          onClick={() => { 
            setActiveCategory(null);
            setActiveSubcategory(null);
          }}
        >
          <Layers className="h-4 w-4" />
          <span>Cards</span>
        </Button>
      </Link>
    </div>
  );
};

export default SidebarNavigation;


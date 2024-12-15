"use client";

import React, { useState } from "react";
import Sidebar from "@/app/dashboard/Sidebar";
import { useDataContext } from "@/app/dashboard/DataProvider";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { categories } = useDataContext();
  const [activeContent, setActiveContent] = useState<string>("Welcome");

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar with max width defined */}
      <div className="flex-shrink-0 max-w-xs w-full">
        <Sidebar
          categories={categories}
          onSelect={(item) => setActiveContent(item)}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-grow overflow-hidden p-4 bg-slate-500">
        {children}
      </div>
    </div>
  );
};

export default Layout;

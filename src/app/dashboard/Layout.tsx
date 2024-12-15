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
    <div className="flex min-h-screen bg-background">
      <Sidebar
        categories={categories}
        onSelect={(item) => setActiveContent(item)}
      />
      <div className="w-4/5 p-4">{children}</div>
    </div>
  );
};

export default Layout;

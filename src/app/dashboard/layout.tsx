"use client";

import React from "react";
import Sidebar from "@/app/dashboard/components/ui/sidebar/Sidebar";
import { DataProvider } from "@/app/dashboard/components/providers/DataProvider";
import { NavigationProvider } from "@/app/dashboard/components/providers/NavigationProvider";
import { DialogProvider } from "@/app/dashboard/components/providers/DialogProvider";
import { SearchProvider } from "@/app/dashboard/components/providers/SearchProvider";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <DataProvider>
      <NavigationProvider>
        <DialogProvider>
          <SearchProvider>
            <div className="flex h-screen overflow-hidden">
                <div className="flex-shrink-0 max-w-xs w-full">
                <Sidebar />
                </div>
                <div className="flex-grow overflow-hidden p-4 bg-slate-500">
                {children}
                </div>
            </div>
          </SearchProvider>
        </DialogProvider>
      </NavigationProvider>
    </DataProvider>
  );
};

export default Layout;


"use client";

import React from "react";
import Sidebar from "@/app/dashboard/components/Sidebar";
import { DataProvider } from "@/app/dashboard/providers/DataProvider";
import { NavigationProvider } from "@/app/dashboard/providers/NavigationProvider";
import { DialogProvider } from "@/app/dashboard/providers/DialogProvider";

interface DashboardClientLayoutProps {
  children: React.ReactNode;
}

const DashboardClientLayout: React.FC<DashboardClientLayoutProps> = ({ children }) => {
  return (
    <DataProvider>
      <NavigationProvider>
        <DialogProvider>
          <div className="flex h-screen overflow-hidden">
            <div className="flex-shrink-0 max-w-xs w-full">
              <Sidebar />
            </div>
            <div className="flex-grow overflow-hidden p-4 bg-slate-500">
              {children}
            </div>
          </div>
        </DialogProvider>
      </NavigationProvider>
    </DataProvider>
  );
};

export default DashboardClientLayout;


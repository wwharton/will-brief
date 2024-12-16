"use client";

import React from "react";
import Layout from "@/app/dashboard/Layout";
import { DataProvider, useDataContext } from "@/app/dashboard/providers/DataProvider";
import CardPool from "@/app/dashboard/components/CardPool";

import { NavigationProvider, useNavigationContext } from "@/app/dashboard/providers/NavigationProvider";

const DashboardContent: React.FC = () => {
  const { activeSubcategory } = useNavigationContext();

  if (activeSubcategory) {
    return <CardPool />;
  }

  return (
    <div className="text-center text-lg font-bold">
      Select a subcategory from the sidebar to begin.
    </div>
  );
};

const DashboardPage: React.FC = () => {
  return (
    <DataProvider>
      <NavigationProvider>
        <Layout>
          <DashboardContent />
        </Layout>
      </NavigationProvider>
    </DataProvider>
  );
};

export default DashboardPage;

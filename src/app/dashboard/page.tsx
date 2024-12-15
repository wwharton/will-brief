"use client";

import React from "react";
import Layout from "@/app/dashboard/Layout";
import { DataProvider, useDataContext } from "@/app/dashboard/DataProvider";
import CardPool from "@/app/dashboard/CardPool";

const DashboardContent: React.FC = () => {
  const { activeSubcategory } = useDataContext();

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
      <Layout>
        <DashboardContent />
      </Layout>
    </DataProvider>
  );
};

export default DashboardPage;

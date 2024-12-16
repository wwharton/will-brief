"use client";

import React from "react";
import Layout from "@/app/dashboard/Layout";
import { DataProvider } from "@/app/dashboard/providers/DataProvider";
import { NavigationProvider } from "@/app/dashboard/providers/NavigationProvider";
import MainWindowContainer from "@/app/dashboard/containers/MainWindowContainer";

const DashboardPage: React.FC = () => {
  return (
    <DataProvider>
      <NavigationProvider>
        <Layout>
          <MainWindowContainer />
        </Layout>
      </NavigationProvider>
    </DataProvider>
  );
};

export default DashboardPage;

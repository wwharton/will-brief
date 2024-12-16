"use client";

import React from "react";
import Layout from "@/app/dashboard/Layout";
import { DataProvider } from "@/app/dashboard/providers/DataProvider";
import { NavigationProvider } from "@/app/dashboard/providers/NavigationProvider";
import MainWindowContainer from "@/app/dashboard/containers/MainWindowContainer";
import {DialogProvider } from "@/app/dashboard/providers/DialogProvider";

const DashboardPage: React.FC = () => {
  return (
    <DataProvider>
      <NavigationProvider>
        <DialogProvider>
          <Layout>
            <MainWindowContainer />
          </Layout>
        </DialogProvider>
      </NavigationProvider>
    </DataProvider>
  );
};

export default DashboardPage;

import React from "react";
import DashboardClientLayout from "./DashboardClientLayout";

// must update the casing of layout, somehow desynced in github from lower (local) upper (github)
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardClientLayout>{children}</DashboardClientLayout>;
}


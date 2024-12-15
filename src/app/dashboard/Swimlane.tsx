import React, { ReactNode } from "react";

interface SwimlaneProps {
  title: string;
  children?: ReactNode;
}

const Swimlane: React.FC<SwimlaneProps> = ({ title, children }) => {
  return (
    <div className="flex flex-col border border-dashed border-border p-4 rounded-lg bg-card text-card-foreground">
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
};

export default Swimlane;

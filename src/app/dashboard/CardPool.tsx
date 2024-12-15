import React from "react";
import Swimlane from "@/app/dashboard/Swimlane";

const CardPool: React.FC = () => {
  return (
    <div className="space-y-4">
      <Swimlane title="Swimlane A" />
      <Swimlane title="Swimlane B" />
      <Swimlane title="Swimlane C" />
    </div>
  );
};

export default CardPool;

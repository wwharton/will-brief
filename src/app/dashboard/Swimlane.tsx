import React from "react";

interface SwimlaneProps {
  title: string;
}

const Swimlane: React.FC<SwimlaneProps> = ({ title }) => {
  return (
    <div className="flex flex-col border border-dashed border-gray-400 p-4 rounded-lg w-1/4">
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <div className="space-y-4">
        {/* Dummy card components */}
        <div className="w-full h-20 bg-accent text-center rounded-lg flex items-center justify-center">
          Card 1
        </div>
        <div className="w-full h-20 bg-accent text-center rounded-lg flex items-center justify-center">
          Card 2
        </div>
      </div>
    </div>
  );
};

export default Swimlane;

"use client";

import React from "react";
import { CardHeader, CardContent } from "@/components/ui/card";

interface ContentSlideProps {
  category: string;
  subcategory?: string;
  swimlane?: string;
  cards: Array<{ id: string; title?: string; content: string }>;
}

const ContentSlide: React.FC<ContentSlideProps> = ({ category, subcategory, swimlane, cards }) => (
  <>
    <CardHeader className="space-y-2">
      {/* SubCategory and Swimlane emphasized */}
      <h3 className="text-center text-1xl sm:text-2xl lg:text-3xl font-bold break-words">
        {category} 
      </h3>
      <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold break-words">
        {subcategory} 
      </h2>
      <h1 className="text-left text-3xl sm:text-4xl lg:text-5xl font-semibold break-words">
        {swimlane}
      </h1>
    </CardHeader>
    <CardContent className="flex-grow overflow-auto">
      <ul className="list-disc pl-6 space-y-4">
        {cards.map(({ id, title, content }) => (
          <li
            key={id}
            className={`text-lg break-words ${
              cards.length <= 3 ? "sm:text-2xl lg:text-3xl" : "sm:text-lg lg:text-xl"
            }`}
          >
            <span className="font-bold">{title || "Untitled"}</span>
            <span> : {content}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </>
);

export default ContentSlide;

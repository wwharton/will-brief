"use client";

import React from "react";
import { CardContent } from "@/components/ui/card";

const TitleSlide: React.FC<{ category: string }> = ({ category }) => (
    <CardContent className="flex-grow flex items-center justify-center">
      <p className="text-4xl sm:text-5xl lg:text-6xl font-bold">
        {category}
      </p>
    </CardContent>
);

export default TitleSlide;

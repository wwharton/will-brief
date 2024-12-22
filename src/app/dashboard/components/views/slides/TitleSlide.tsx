import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TitleSlideProps {
  category: string;
}

const TitleSlide: React.FC<TitleSlideProps> = ({ category }) => {
  return (
    <Card className="h-full flex flex-col justify-center items-center">
      <CardHeader>
        <CardTitle className="text-6xl font-bold text-center">{category}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default TitleSlide;


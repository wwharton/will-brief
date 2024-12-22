"use client";

import React, { useState, useMemo } from "react";
import { useDataContext } from "@/app/dashboard/providers/DataProvider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { generateSlides } from "./utils";
import TitleSlide from "./slides/TitleSlide";
import ContentSlide from "./slides/ContentSlide";

const PresentationView: React.FC = () => {
  const { cards } = useDataContext();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = useMemo(() => generateSlides(cards), [cards]);
  const totalSlides = slides.length;

  const goToPreviousSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  if (!slides.length) {
    return (
      <Card className="h-full flex items-center justify-center">
        <p className="text-center text-lg font-bold">No cards to display.</p>
      </Card>
    );
  }

  const currentSlideData = slides[currentSlide];

  return (
    <Card className="light h-full flex flex-col">
      {currentSlideData.isTitleCard ? (
        <TitleSlide category={currentSlideData.category} />
      ) : (
        <ContentSlide
          category={currentSlideData.category}
          subcategory={currentSlideData.subcategory}
          swimlane={currentSlideData.swimlane}
          cards={currentSlideData.cards}
        />
      )}
      <div className="flex justify-between items-center mt-4 px-4">
        <Button onClick={goToPreviousSlide} variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Slide {currentSlide + 1} of {totalSlides}
        </span>
        <Button onClick={goToNextSlide} variant="outline">
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default PresentationView;

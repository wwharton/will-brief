import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TitleSlide from "./TitleSlide";
import ContentSlide from "./ContentSlide";
import { ISlide } from "@/app/dashboard/presentation/utils";

interface ActiveSlideProps {
  currentSlideData: ISlide;
  currentSlide: number;
  totalSlides: number;
  goToPreviousSlide: () => void;
  goToNextSlide: () => void;
}

const ActiveSlide: React.FC<ActiveSlideProps> = ({
  currentSlideData,
  currentSlide,
  totalSlides,
  goToPreviousSlide,
  goToNextSlide,
}) => {
  return (
    <Card className="light h-full flex flex-col flex-grow">
      <div className="flex-grow overflow-auto">
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
      </div>
      <div className="flex justify-between items-center mt-4 px-4 py-2 border-t">
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

export default ActiveSlide;


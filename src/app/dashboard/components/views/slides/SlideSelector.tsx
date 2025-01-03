import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ISlide } from "@/app/dashboard/components/views/utils";

interface SlideViewProps {
  slides: ISlide[];
  currentSlide: number;
  onSlideSelect: (index: number) => void;
}

const SlideSelector: React.FC<SlideViewProps> = ({ slides, currentSlide, onSlideSelect }) => {
  return (
    <Card className="h-[96%] w-64 flex-shrink-0">
      <CardContent className="p-4 h-full">
        <ScrollArea className="h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`p-2 mb-2 cursor-pointer rounded transition-colors ${
                index === currentSlide ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
              }`}
              onClick={() => onSlideSelect(index)}
            >
              <div className="text-sm font-medium truncate">
                {slide.isTitleCard ? slide.category : slide.subcategory}
              </div>
              <div className="text-xs text-muted-foreground truncate">
                {slide.isTitleCard ? "" : slide.swimlane}
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default SlideSelector;


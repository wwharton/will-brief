"use client";

import React, { useState, useMemo, useRef, useCallback } from "react";
import { useDataContext } from "@/app/dashboard/providers/DataProvider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2 } from 'lucide-react';
import { generateSlides } from "./utils";
import SlideSelector from "./components/slides/SlideSelector";
import ActiveSlide from "./components/slides/ActiveSlide";

const Presentation: React.FC = () => {
  const { cards } = useDataContext();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const presentationRef = useRef<HTMLDivElement>(null);

  const slides = useMemo(() => generateSlides(cards), [cards]);
  const totalSlides = slides.length;

  const goToPreviousSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  const toggleFullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
      presentationRef.current?.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  }, []);

  if (!slides.length) {
    return (
      <Card className="h-full flex items-center justify-center">
        <p className="text-center text-lg font-bold">No cards to display.</p>
      </Card>
    );
  }

  const currentSlideData = slides[currentSlide];

  return (
    <div ref={presentationRef} className="h-full flex flex-col">
      <div className="flex-grow flex space-x-4">
        <div className="flex flex-col">
          <SlideSelector
            slides={slides}
            currentSlide={currentSlide}
            onSlideSelect={setCurrentSlide}
          />
          <Button onClick={toggleFullScreen} variant="outline" size="sm" className="mt-2 h-[4%]">
            {isFullScreen ? (
              <>
                <Minimize2 className="mr-2 h-4 w-4" /> Exit Full Screen
              </>
            ) : (
              <>
                <Maximize2 className="mr-2 h-4 w-4" /> Full Screen
              </>
            )}
          </Button>
        </div>
        <ActiveSlide
          currentSlideData={currentSlideData}
          currentSlide={currentSlide}
          totalSlides={totalSlides}
          goToPreviousSlide={goToPreviousSlide}
          goToNextSlide={goToNextSlide}
        />
      </div>
    </div>
  );
};

export default Presentation;
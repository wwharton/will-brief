export const generateSlides = (cards: Array<{ id: string; category: string; subCategory: string; swimlane: string; content: string }>) => {
    const groupedSlides: Record<
      string,
      Record<string, Record<string, { id: string; title: string; content: string }[]>>
    > = {};
  
    cards.forEach((card) => {
      if (!groupedSlides[card.category]) {
        groupedSlides[card.category] = {};
      }
      if (!groupedSlides[card.category][card.subCategory]) {
        groupedSlides[card.category][card.subCategory] = {};
      }
      if (!groupedSlides[card.category][card.subCategory][card.swimlane]) {
        groupedSlides[card.category][card.subCategory][card.swimlane] = [];
      }
      groupedSlides[card.category][card.subCategory][card.swimlane].push({
        id: card.id,
        title: card.title,
        content: card.content,
      });
    });
  
    // Create slides and include title cards for each category
    const slides: Array<{
      category: string;
      subcategory?: string;
      swimlane?: string;
      cards: { id: string; title: string; content: string }[];
      isTitleCard?: boolean;
    }> = [];
  
    Object.entries(groupedSlides).forEach(([category, subcategories]) => {
      // Insert a title card for the category
      slides.push({
        category,
        cards: [],
        isTitleCard: true, // Indicate this is a title card
      });
  
      // Add all subcategory and swimlane slides
      Object.entries(subcategories).forEach(([subcategory, swimlanes]) => {
        Object.entries(swimlanes).forEach(([swimlane, cards]) => {
          slides.push({
            category,
            subcategory,
            swimlane,
            cards,
          });
        });
      });
    });
  
    return slides;
  };
  
export const createDataContext = (overrides: Record<string, unknown> = {}) => ({
    cards: [
      { id: "1", category: "Test Category", subCategory: "Test Subcategory", swimlane: "Swimlane 1", title: "Card 1", content: "Content 1", type: "bullet", rank: 100 },
      { id: "2", category: "Test Category", subCategory: "Test Subcategory", swimlane: "Swimlane 2", title: "Card 2", content: "Content 2", type: "bullet", rank: 200 },
    ],
    ...overrides,
  });
  
  export const useDataContext = jest.fn(() => createDataContext());
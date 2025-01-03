export const createNavigationContext = (overrides: Record<string, unknown> = {}) => ({
    activeCategory: "Test Category",
    activeSubcategory: "Test Subcategory",
    setActiveCategory: jest.fn(),
    setActiveSubcategory: jest.fn(),
    setActiveView: jest.fn(),
    ...overrides,
  });
import React from "react";
import { render, screen } from "@testing-library/react";
import { useDataContext } from "@/app/dashboard/providers/DataProvider";
import { useNavigationContext } from "@/app/dashboard/providers/NavigationProvider";
import { useDialogContext } from "@/app/dashboard/providers/DialogProvider";
import CardPool from "@/app/dashboard/components/CardPool";
import '@testing-library/jest-dom'


export const createNavigationContext = (overrides = {}) => ({
  activeCategory: "Test Category",
  activeSubcategory: "Test Subcategory",
  setActiveCategory: jest.fn(),
  setActiveSubcategory: jest.fn(),
  setActiveView: jest.fn(),
  ...overrides,
});

jest.mock("@/app/dashboard/providers/DataProvider");
jest.mock("@/app/dashboard/providers/NavigationProvider");
jest.mock("@/app/dashboard/providers/DialogProvider");

const mockCards = [
  { id: "1", category: "Test Category", subCategory: "Test Subcategory", swimlane: "Swimlane 1", title: "Card 1", content: "Content 1", type: "bullet", rank: 100 },
  { id: "2", category: "Test Category", subCategory: "Test Subcategory", swimlane: "Swimlane 2", title: "Card 2", content: "Content 2", type: "bullet", rank: 200 },
];

describe("CardPool", () => {
  beforeEach(() => {
    (useDataContext as jest.Mock).mockReturnValue({ cards: mockCards });
    (useNavigationContext as jest.Mock).mockReturnValue(createNavigationContext());
    (useDialogContext as jest.Mock).mockReturnValue({ openDialog: jest.fn() });
  });

  it("renders the CardPool component", () => {
    render(<CardPool />);

    expect(screen.getByText("Test Subcategory")).toBeInTheDocument();
    expect(screen.getByText("Swimlane 1")).toBeInTheDocument();
    expect(screen.getByText("Swimlane 2")).toBeInTheDocument();
    expect(screen.getByText("Card 1")).toBeInTheDocument();
    expect(screen.getByText("Card 2")).toBeInTheDocument();
  });
});
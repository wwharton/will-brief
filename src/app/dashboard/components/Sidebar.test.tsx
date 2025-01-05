import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "@/app/dashboard/components/Sidebar";
import { useDataContext } from "@/app/dashboard/providers/DataProvider";
import { useDialogContext } from "@/app/dashboard/providers/DialogProvider";
import { createNavigationContext } from "@/app/dashboard/providers/__mocks__/NavigationProviderMocks";

jest.mock('@/app/dashboard/providers/DataProvider');
jest.mock('@/app/dashboard/providers/NavigationProvider');
jest.mock('@/app/dashboard/providers/DialogProvider');
jest.mock('@/app/dashboard/providers/NavigationProvider', () => ({
  useNavigationContext: jest.fn(() => createNavigationContext()),
}));

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => "mocked-url");

describe("Sidebar", () => {
  const mockExportCards = jest.fn().mockReturnValue(JSON.stringify({}));
  const mockImportCards = jest.fn();
  const mockOpenDialog = jest.fn();

  beforeEach(() => {
    (useDataContext as jest.Mock).mockReturnValue({
      categories: [
        { category: "Category1", items: ["Item1", "Item2"] },
        { category: "Category2", items: ["Item3", "Item4"] },
      ],
      exportCards: mockExportCards,
      importCards: mockImportCards,
    });

    (useDialogContext as jest.Mock).mockReturnValue({
      openDialog: mockOpenDialog,
    });
  });

  it("renders the Sidebar component", () => {
    render(<Sidebar />);
    expect(screen.getByText("Will-Brief Demo")).toBeInTheDocument();
  });

  it("renders categories and items", () => {
    render(<Sidebar />);
    
    // Click on Category1 to reveal its items
    fireEvent.click(screen.getByText("Category1"));
    expect(screen.getByText("Item1")).toBeInTheDocument();
    expect(screen.getByText("Item2")).toBeInTheDocument();
    
    // Click on Category2 to reveal its items
    fireEvent.click(screen.getByText("Category2"));
    expect(screen.getByText("Item3")).toBeInTheDocument();
    expect(screen.getByText("Item4")).toBeInTheDocument();
  });

  it("calls openDialog when New Card button is clicked", () => {
    render(<Sidebar />);
    fireEvent.click(screen.getByText("New Card"));
    expect(mockOpenDialog).toHaveBeenCalledWith("new");
  });

  it("toggles Import/Export section visibility", () => {
    render(<Sidebar />);
    fireEvent.click(screen.getByText("Import / Export Cards"));
    expect(screen.getByText("Export Cards")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Import / Export Cards"));
    expect(screen.queryByText("Export Cards")).not.toBeInTheDocument();
  });

  it("calls exportCards when Export Cards button is clicked", () => {
    render(<Sidebar />);
    fireEvent.click(screen.getByText("Import / Export Cards"));
    fireEvent.click(screen.getByText("Export Cards"));
    expect(mockExportCards).toHaveBeenCalled();
  });

  it("calls importCards with correct JSON when Import Cards button is clicked", () => {
    render(<Sidebar />);
    fireEvent.click(screen.getByText("Import / Export Cards"));
    fireEvent.change(screen.getByPlaceholderText("Paste JSON here to import cards"), { target: { value: '{"test": "data"}' } });
    fireEvent.click(screen.getByText("Import Cards"));
    expect(mockImportCards).toHaveBeenCalledWith('{"test": "data"}');
  });
});
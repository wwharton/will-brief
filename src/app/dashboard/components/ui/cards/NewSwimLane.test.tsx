import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NewSwimLane from "@/app/dashboard/components/ui/cards/NewSwimLane";
import { useDataContext } from "@/app/dashboard/components/providers/DataProvider";

jest.mock('@/app/dashboard/providers/DataProvider');

describe("NewSwimLane", () => {
  const mockCreateCard = jest.fn();
  const mockUseDataContext = useDataContext as jest.Mock;

  beforeEach(() => {
    mockUseDataContext.mockReturnValue({
      createCard: mockCreateCard,
    });
  });

  const defaultProps = {
    activeCategory: "TestCategory",
    activeSubcategory: "TestSubcategory",
  };

  it("renders the NewSwimLane component with Add Lane button", () => {
    render(<NewSwimLane {...defaultProps} />);

    expect(screen.getByText("Add Lane")).toBeInTheDocument();
  });

  it("shows input and Create Lane button when Add Lane is clicked", () => {
    render(<NewSwimLane {...defaultProps} />);

    fireEvent.click(screen.getByText("Add Lane"));

    expect(screen.getByPlaceholderText("Enter lane name")).toBeInTheDocument();
    expect(screen.getByText("Create Lane")).toBeInTheDocument();
  });

  it("calls createCard with correct parameters when Create Lane is clicked", () => {
    render(<NewSwimLane {...defaultProps} />);

    fireEvent.click(screen.getByText("Add Lane"));
    fireEvent.change(screen.getByPlaceholderText("Enter lane name"), { target: { value: "New Lane" } });
    fireEvent.click(screen.getByText("Create Lane"));

    expect(mockCreateCard).toHaveBeenCalledWith({
      category: "TestCategory",
      subCategory: "TestSubcategory",
      swimlane: "New Lane",
      title: "Placeholder",
      content: "Update Me!",
      type: "bullet",
    });
  });

  it("resets input and hides Create Lane button after creating a lane", () => {
    render(<NewSwimLane {...defaultProps} />);

    fireEvent.click(screen.getByText("Add Lane"));
    fireEvent.change(screen.getByPlaceholderText("Enter lane name"), { target: { value: "New Lane" } });
    fireEvent.click(screen.getByText("Create Lane"));

    expect(screen.queryByPlaceholderText("Enter lane name")).not.toBeInTheDocument();
    expect(screen.queryByText("Create Lane")).not.toBeInTheDocument();
    expect(screen.getByText("Add Lane")).toBeInTheDocument();
  });
});
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Card from "@/app/dashboard/components/ui/cards/CardComponent";
import '@testing-library/jest-dom';

describe("Card", () => {
  const mockEdit = jest.fn();
  const mockDelete = jest.fn();

  const defaultProps = {
    title: "Test Title",
    content: "Test Content",
    onEdit: mockEdit,
    onDelete: mockDelete,
  };

  it("renders the Card component with title and content", () => {
    render(<Card {...defaultProps} />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("calls onEdit when the Edit button is clicked", () => {
    render(<Card {...defaultProps} />);

    fireEvent.click(screen.getByTestId("edit-button"));

    expect(mockEdit).toHaveBeenCalled();
  });

  //   add onDelete mocking
});
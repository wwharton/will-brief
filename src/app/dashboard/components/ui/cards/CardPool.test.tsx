import React from "react";
import { render, screen } from "@testing-library/react";
import { useDataContext } from "@/app/dashboard/components/providers/DataProvider";
import { useNavigationContext } from "@/app/dashboard/components/providers/NavigationProvider";
import { useDialogContext } from "@/app/dashboard/components/providers/DialogProvider";
import CardPool from "@/app/dashboard/components/ui/cards/CardPool";
import { createNavigationContext } from "@/app/dashboard/components/providers/__mocks__/NavigationProviderMocks";
import { createDataContext } from "@/app/dashboard/components/providers/__mocks__/DataProviderMocks";

jest.mock("@/app/dashboard/providers/DataProvider");
jest.mock("@/app/dashboard/providers/NavigationProvider");
jest.mock("@/app/dashboard/providers/DialogProvider");

describe("CardPool", () => {
  beforeEach(() => {
    (useDataContext as jest.Mock).mockReturnValue(createDataContext());
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
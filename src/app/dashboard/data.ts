import { ICard } from "@/app/dashboard/ICard";

export const initialCards: ICard[] = [
    {
      id: "1",
      category: "1 - End State",
      subCategory: "Define Success",
      swimLane: "1 - User Story",
      content: "Customer can see their order status",
      type: "bullet",
    },
    {
      id: "2",
      category: "1 - End State",
      subCategory: "Define Success",
      swimLane: "2 - KPIs",
      content: "Customer emails regarding order status down by 90%",
      type: "bullet",
    },
    {
      id: "3",
      category: "2 - Engineering Design",
      subCategory: "Backend",
      swimLane: "API",
      content: "GET /order/status",
      type: "endpoint",
    },
    {
      id: "4",
      category: "2 - Engineering Design",
      subCategory: "Backend",
      swimLane: "Database",
      content: "OrderStatus table",
      type: "table",
    },
    {
      id: "5",
      category: "2 - Engineering Design",
      subCategory: "Frontend",
      swimLane: "User Profile",
      content: "<OrderStatus />",
      type: "table",
    },
  ];
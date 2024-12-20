import { ICard } from "@/app/dashboard/ICard";

const cardDataKey = Symbol('card');
export type TCardData = { [cardDataKey]: true; cardId: ICard['id'] };

export function getCardData(card: ICard): TCardData {
  return { [cardDataKey]: true, cardId: card.id };
}

export function isCardData(data: Record<string | symbol, unknown>): data is TCardData {
  return data[cardDataKey] === true;
}

export const initialCards: ICard[] = [
    {
      id: "1",
      category: "1 - End State",
      subCategory: "Define Success",
      swimlane: "1 - User Story",
      title: "Self Serve Order Status",
      content: "Customer can see their order status in their profile",
      type: "bullet",
      lexKey: "1 - End State:Define Success:1 - User Story:0001",
    },
    {
      id: "2",
      category: "1 - End State",
      subCategory: "Define Success",
      swimlane: "2 - KPIs",
      title: "Reduced Support Needs",
      parent: "",
      content: "Customer emails regarding order status down by 90%",
      type: "bullet",
      lexKey: "1 - End State:Define Success:2 - KPIs:0002",
    },
    {
      id: "3",
      category: "2 - Engineering Design",
      subCategory: "Backend",
      swimlane: "API",
      title: "GET /order/status",
      content: "returns record from table",
      parent: "5",
      type: "endpoint",
      lexKey: "2 - Engineering Design:Backend:API:0003",
    },
    {
      id: "4",
      category: "2 - Engineering Design",
      subCategory: "Backend",
      swimlane: "Database",
      title: "OrderStatus table",
      content: "cols include: status, tracking_id",
      parent: "3",
      type: "table",
      lexKey: "2 - Engineering Design:Backend:Database:0004",
    },
    {
      id: "5",
      category: "2 - Engineering Design",
      subCategory: "Frontend",
      swimlane: "User Profile",
      title: "<OrderStatus />",
      content: "Component under <UserProfile />",
      type: "table",
      lexKey: "2 - Engineering Design:Frontend:User Profile:0005",
    },
  ];
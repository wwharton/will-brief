import { ICard } from "@/app/dashboard/ICard";

const cardDataKey = Symbol('card');
export type TCardData = ICard & { [cardDataKey]: true } & Record<string | symbol, unknown>;

export function getCardData(card: ICard): TCardData {
  return { ...card, [cardDataKey]: true as const };
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
    rank: 100,
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
    rank: 200,
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
    rank: 300,
  },
  {
    id: "4",
    category: "2 - Engineering Design",
    subCategory: "Backend",
    swimlane: "Database",
    title: "Order table",
    content: "cols extended to include: status, tracking_id",
    parent: undefined,
    type: "table",
    rank: 400,
  },
  {
    id: "5",
    category: "2 - Engineering Design",
    subCategory: "Frontend",
    swimlane: "User Profile",
    title: "<OrderStatus />",
    content: "Component under <UserProfile />",
    type: "table",
    rank: 500,
  },
  {
    id: "6",
    category: "2 - Engineering Design",
    subCategory: "Backend",
    swimlane: "API",
    title: "POST /order/status",
    content: "updates order status in the database",
    parent: undefined,
    type: "endpoint",
    rank: 600,
  },
  {
    id: "8",
    category: "2 - Engineering Design",
    subCategory: "Frontend",
    swimlane: "User Profile",
    title: "<OrderHistory />",
    content: "Component to display order status history",
    parent: undefined,
    type: "table",
    rank: 800,
  },
  {
    id: "9",
    category: "2 - Engineering Design",
    subCategory: "Frontend",
    swimlane: "User Profile",
    title: "<OrderDetails />",
    content: "Component to display detailed order information",
    parent: undefined,
    type: "table",
    rank: 700,
  },
  {
    id: "10",
    category: "2 - Engineering Design",
    subCategory: "Backend",
    swimlane: "API",
    title: "GET /order/details",
    content: "returns detailed order information",
    parent: "9",
    type: "endpoint",
    rank: 1000,
  },
];
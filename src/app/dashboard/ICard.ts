export interface ICard {
  id: string; // Unique identifier for the card
  category: string; // The main category the card belongs to
  subCategory: string; // The subcategory the card is tied to
  swimlane: string; // The swimlane the card belongs to
  title: string; // Short descriptor
  content: string; // The text content of the card
  parent?: string; // id of parent card, used for diagraming
  type: "bullet" | "table" | "column" | "endpoint"; // The type of the card
}

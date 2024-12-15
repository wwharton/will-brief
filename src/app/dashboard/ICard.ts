export interface ICard {
  id: string; // Unique identifier for the card
  category: string; // The main category the card belongs to
  subCategory: string; // The subcategory the card is tied to
  swimLane: string; // The swimlane the card belongs to
  content: string; // The text content of the card
  type: "bullet" | "table" | "column" | "endpoint"; // The type of the card
}

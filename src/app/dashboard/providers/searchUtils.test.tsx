import { createInvertedIndex, searchCards, normalizeText } from '@/app/dashboard/providers/searchUtils';
import { ICard } from '@/app/dashboard/ICard';

const mockCards: ICard[] = [
  { id: "1", category: "Category1", subCategory: "Sub1", swimlane: "Lane1", title: "Self Serve Order Status", content: "Customer can see their order status", type: "bullet", rank: 1 },
  { id: "2", category: "Category1", subCategory: "Sub1", swimlane: "Lane2", title: "Reduced Support Needs", content: "Customer emails down by 90%", type: "bullet", rank: 2 },
  { id: "3", category: "Category2", subCategory: "Sub2", swimlane: "Lane1", title: "GET /order/status", content: "returns record from table", type: "endpoint", rank: 3 },
];

describe("searchUtils", () => {
  it("normalizes text correctly", () => {
    expect(normalizeText("Self Serve Order Status")).toEqual(["self", "serve", "order", "status"]);
  });

  it("creates an inverted index correctly", () => {
    const invertedIndex = createInvertedIndex(mockCards);
    expect(invertedIndex["self"]).toEqual(new Set(["1"]));
    expect(invertedIndex["serve"]).toEqual(new Set(["1"]));
    expect(invertedIndex["order"]).toEqual(new Set(["1", "3"]));
    expect(invertedIndex["status"]).toEqual(new Set(["1", "3"]));
    expect(invertedIndex["reduced"]).toEqual(new Set(["2"]));
    expect(invertedIndex["support"]).toEqual(new Set(["2"]));
    expect(invertedIndex["needs"]).toEqual(new Set(["2"]));
  });

  it("searches cards correctly", () => {
    const invertedIndex = createInvertedIndex(mockCards);
    expect(searchCards("self serve", mockCards, invertedIndex)).toEqual(["1"]);
    expect(searchCards("order", mockCards, invertedIndex)).toEqual(["1", "3"]);
    expect(searchCards("emails", mockCards, invertedIndex)).toEqual(["2"]);
  });
});
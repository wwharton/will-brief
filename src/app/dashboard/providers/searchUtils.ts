import { ICard } from '@/app/dashboard/ICard';

export interface InvertedIndex {
  [word: string]: Set<string>;
}

export const normalizeText = (text: string): string[] => {
  return text.toLowerCase().match(/\b[a-z]+\b/g) || [];
};

export const createInvertedIndex = (cards: ICard[]): InvertedIndex => {
  const newIndex: InvertedIndex = {};
  cards.forEach((card: ICard) => {
    const words = new Set([
      ...normalizeText(card.title || ''),
      ...normalizeText(card.content || '')
    ]);
    words.forEach((word) => {
      if (!newIndex[word]) {
        newIndex[word] = new Set();
      }
      newIndex[word].add(card.id);
    });
  });
  return newIndex;
};

export const searchCards = (query: string, cards: ICard[], invertedIndex: InvertedIndex): string[] => {
  const searchWords = normalizeText(query);
  if (searchWords.length === 0) return cards.map(card => card.id);

  let result: Set<string> | null = null;
  searchWords.forEach((word) => {
    const wordResults = new Set<string>();
    Object.keys(invertedIndex).forEach(indexWord => {
      if (indexWord.startsWith(word)) {
        invertedIndex[indexWord].forEach(id => wordResults.add(id));
      }
    });
    if (result === null) {
      result = new Set(wordResults);
    } else {
      result = new Set([...result].filter(x => wordResults.has(x)));
    }
  });

  return result ? Array.from(result) : [];
};
export function invariant(condition: any /* eslint-disable-line @typescript-eslint/no-explicit-any */, message?: string): asserts condition {
    if (!condition) {
      throw new Error(message || "Invariant violation");
    }
  }
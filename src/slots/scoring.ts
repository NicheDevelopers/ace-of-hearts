import { Paytable, PaytableEntry } from "./Paytable";

export function getLineScore(symbols: string[], paytable: Paytable): number {
  let maxScore = 0;

  // Function to calculate score for a specific symbol
  const calculateScore = (targetSymbol: string) => {
    let streak = 0;
    const targetEntry = paytable.getEntryByUrl(targetSymbol);

    for (const symbol of symbols) {
      const currentEntry = paytable.getEntryByUrl(symbol);
      if (symbol === targetSymbol || currentEntry.isWildcard) {
        streak++;
      } else {
        break;
      }
    }

    if (streak >= 3) {
      return (
        targetEntry.streaks[streak as keyof typeof targetEntry.streaks] || 0
      );
    }
    return 0;
  };

  // Calculate score for each unique non-wildcard symbol
  const uniqueSymbols = new Set(
    symbols.filter((symbol) => !paytable.getEntryByUrl(symbol).isWildcard),
  );
  for (const symbol of uniqueSymbols) {
    const score = calculateScore(symbol);
    if (score > maxScore) {
      maxScore = score;
    }
  }

  // Handle the case where all symbols are wildcards
  if (uniqueSymbols.size === 0 && symbols.length > 0) {
    const wildcardEntry = paytable.getEntryByUrl(symbols[0]);
    maxScore = Math.max(
      wildcardEntry.streaks[3],
      wildcardEntry.streaks[4],
      wildcardEntry.streaks[5],
    );
  }

  return maxScore;
}

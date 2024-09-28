import { Paytable, Symbol } from "./Paytable";

export function getLineScore(symbols: Symbol[], paytable: Paytable): number {
  // Find the longest matching streak of symbols (excluding wilds)
  let longestStreak = 0;
  let currentStreak = 1;
  let currentSymbol = symbols[0];

  for (let i = 1; i < symbols.length; i++) {
    if (symbols[i] === currentSymbol && !currentSymbol.isWildcard) {
      currentStreak++;
    } else {
      longestStreak = Math.max(longestStreak, currentStreak);
      currentStreak = 1;
      currentSymbol = symbols[i];
    }
  }
  longestStreak = Math.max(longestStreak, currentStreak);

  // Find the matching symbol in the paytable
  const matchingSymbol = paytable.symbols.find(
    (symbol) => symbol === currentSymbol,
  );

  // Calculate the score based on the streak length and paytable
  if (matchingSymbol) {
    return (
      matchingSymbol.streaks[longestStreak as keyof Symbol["streaks"]] || 0
    );
  }

  return 0;
}

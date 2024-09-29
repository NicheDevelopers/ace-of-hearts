import lineColors from "./lineColors";

const generateLines = (width: number, height: number) =>
  Array(height)
    .fill(0)
    .map((_, i) => i)
    .map((e) =>
      (function p(a: number[], width: number, height: number): number[][] {
        return a.length === width
          ? [a]
          : [-1, 0, 1]
              .map((n) => [...a, a[a.length - 1] + n])
              .filter((o) => !o.some((e) => e < 0 || e >= height))
              .map((o) => p(o, width, height))
              .flat();
      })([e], width, height),
    )
    .flat();

function mirrorElem(a: number[], v: number) {
  return a[a.length - 1 - v];
}

function isSymmetrical(a: number[]) {
  return a.every((e, i) => e === mirrorElem(a, i));
}

function longestStreak(l: number[]): number {
  let longest = -Infinity;
  let current = 1;
  for (let i = 0; i < l.length; ++i) {
    if (l[i] === l[i - 1]) current += 1;
    else {
      if (current > longest) longest = current;
      current = 1;
    }
  }
  return Math.max(longest, current);
}

function streaks(l: number[], height: number): number[] {
  const longest = Array(height).fill(0);
  const current = Array(height).fill(0);

  for (let i = 0; i < l.length + 1; ++i) {
    current[l[i]]++;
    if (l[i] !== l[i - 1]) {
      longest[l[i - 1]] = Math.max(current[l[i - 1]], longest[l[i - 1]]);
      current[l[i - 1]] = 0;
    }
  }

  return longest;
}

function lineScore(l: number[], height: number): number {
  const topStreaks = streaks(l, height).sort((a, b) => b - a);
  const longestStreakPoints = topStreaks[0] * 5;
  const secondLongestStreakPoints = topStreaks[1] * 3;
  const symmetricalPoints = isSymmetrical(l) ? 7 : 0;

  //console.log(l.toString(), topStreaks, longestStreakPoints, secondLongestStreakPoints);

  return longestStreakPoints + secondLongestStreakPoints + symmetricalPoints;
}

export interface Line {
  heights: number[];
  color: string;
}

const MAX_LINES = 50;

export default function getLines(
  width: number,
  height: number,
  howManyLines: number,
): Line[] {
  if (howManyLines > MAX_LINES) {
    throw "Max number of lines exceeded";
  }
  const lineHeights = generateLines(width, height)
    .sort((a, b) => lineScore(b, height) - lineScore(a, height))
    .slice(0, howManyLines);

  let lines = [] as Line[];
  for (let i = 0; i < howManyLines; i++) {
    if (i < 10) {
      lines[i] = { heights: lineHeights[i], color: lineColors[10] };
      continue;
    }
    if (i < 20) {
      lines[i] = { heights: lineHeights[i], color: lineColors[20] };
      continue;
    }
    if (i < 30) {
      lines[i] = { heights: lineHeights[i], color: lineColors[30] };
      continue;
    }
    if (i < 40) {
      lines[i] = { heights: lineHeights[i], color: lineColors[40] };
      continue;
    }
    if (i < 50) {
      lines[i] = { heights: lineHeights[i], color: lineColors[50] };
      continue;
    }
  }

  return lines;
}

export interface PaytableEntry {
  textureUrl: string;
  streaks: {
    3: number;
    4: number;
    5: number;
  };
  isWildcard: boolean;
}

export interface Paytable {
  symbols: PaytableEntry[];
}

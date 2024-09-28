import { Assets, Texture } from "pixi.js";

export interface PaytableEntry {
  textureUrl: string;
  streaks: {
    3: number;
    4: number;
    5: number;
  };
  isWildcard: boolean;
}

export class Paytable {
  symbols: PaytableEntry[];

  constructor(symbols: PaytableEntry[]) {
    this.symbols = symbols;
  }
  async init() {
    const promises = this.symbols.map(
      async (s) => await Assets.load(s.textureUrl),
    );
    await Promise.all(promises);
  }
  getTextures() {
    return this.symbols.map((s) => Texture.from(s.textureUrl));
  }
  getEntryByUrl(url: string): PaytableEntry {
    return this.symbols.find((s) => s.textureUrl === url)!;
  }
}

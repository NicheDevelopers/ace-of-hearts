import { Assets, Texture } from "pixi.js";

export interface PaytableEntry {
  textureUrl: string;
  streaks: {
    3: number;
    4: number;
    5: number;
  };
  rarity: number;
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
  getRandomTextureIndex() {
    const raritySum = this.symbols.reduce((acc, s) => acc + (4 - s.rarity) ** 2, 0);
    const random = Math.floor(Math.random() * raritySum);

    let current = 0;
    let index = 0;
    for (const s of this.symbols) {
      current += (4 - s.rarity) ** 2;
      if (random < current) {
        return index;
      }
      index++;
    }
    return this.symbols.length - 1;
  }
}

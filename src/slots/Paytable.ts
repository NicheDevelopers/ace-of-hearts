import { Assets, Texture } from "pixi.js";
import * as PIXI from "pixi.js";

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
  horseShoeSprite: PIXI.Sprite;

  constructor(symbols: PaytableEntry[], horseShoe: string) {
    console.log(horseShoe);
    this.symbols = symbols;
    const witcherTexture = PIXI.Texture.from(horseShoe);
    this.horseShoeSprite = new PIXI.Sprite(witcherTexture);

    this.horseShoeSprite.anchor.set(0, 0);
    this.horseShoeSprite.x = 0;
    this.horseShoeSprite.y = 0;
    this.horseShoeSprite.width = 1920;
    this.horseShoeSprite.height = 1080;
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
    // remove the protocol from the url
    url = url.replace(/.*:\/\//, '');
    // remove the origin from the url
    url = url.replace(/.*?\//, '/');
    const entry = this.symbols.find((s) => s.textureUrl === url);
    if (!entry) {
      throw new Error(`Entry with url ${url} not found. Possible entries: ${this.symbols.map(s => s.textureUrl).join(', ')}`);
    }
    return entry;
  }
  getRandomTextureIndex() {
    const raritySum = this.symbols.reduce(
      (acc, s) => acc + (4 - s.rarity) ** 2,
      0,
    );
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

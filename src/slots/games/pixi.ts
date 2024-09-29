import { Assets } from "pixi.js";
import { Paytable, PaytableEntry } from "../Paytable";
import pixiHorseshoePath from "/slots/pixi-background.png";

const pixiEntries: PaytableEntry[] = [
  {
    isWildcard: false,
    streaks: {
      3: 25,
      4: 50,
      5: 100,
    },
    rarity: 1,
    textureUrl: "https://pixijs.com/assets/eggHead.png",
  },
  {
    isWildcard: false,
    streaks: {
      3: 5,
      4: 10,
      5: 15,
    },
    rarity: 1,
    textureUrl: "https://pixijs.com/assets/flowerTop.png",
  },
  {
    isWildcard: false,
    streaks: {
      3: 75,
      4: 150,
      5: 200,
    },
    rarity: 1,
    textureUrl: "https://pixijs.com/assets/helmlok.png",
  },
  {
    isWildcard: false,
    streaks: {
      3: 250,
      4: 500,
      5: 1000,
    },
    rarity: 1,
    textureUrl: "https://pixijs.com/assets/skully.png",
  },
];
await Assets.load(pixiHorseshoePath);
const pixiPaytable = new Paytable(pixiEntries, pixiHorseshoePath);
console.log("pixi init");
await pixiPaytable.init();
console.log("done pixi init");

export default pixiPaytable;

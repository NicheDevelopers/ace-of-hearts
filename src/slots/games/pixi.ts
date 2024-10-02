import { Assets } from "pixi.js";
import { Paytable, PaytableEntry } from "../Paytable";
import pixiHorseshoePath from "/slots/pixi-background.png";

import eggHead from "/slots/eggHead.png";
import flowerTop from "/slots/flowerTop.png";
import helmlok from "/slots/helmlok.png";
import skully from "/slots/skully.png";

const pixiEntries: PaytableEntry[] = [
  {
    isWildcard: false,
    streaks: {
      3: 25,
      4: 50,
      5: 100,
    },
    rarity: 1,
    textureUrl: eggHead,
  },
  {
    isWildcard: false,
    streaks: {
      3: 5,
      4: 10,
      5: 15,
    },
    rarity: 1,
    textureUrl: flowerTop,
  },
  {
    isWildcard: false,
    streaks: {
      3: 75,
      4: 150,
      5: 200,
    },
    rarity: 1,
    textureUrl: helmlok,
  },
  {
    isWildcard: false,
    streaks: {
      3: 250,
      4: 500,
      5: 1000,
    },
    rarity: 1,
    textureUrl: skully,
  },
];

async function getPixiPaytable() {
  await Assets.load(pixiHorseshoePath);
  const pixiPaytable = new Paytable(pixiEntries, pixiHorseshoePath);
  await pixiPaytable.init();
  return pixiPaytable;
}

export default getPixiPaytable;

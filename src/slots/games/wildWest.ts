import { Assets } from "pixi.js";
import { Paytable, PaytableEntry } from "../Paytable";
import wildWestHorseShoePath from "/slots/ww-horseshoe.png";
import wildWestCactusPath from "/slots/ww-cactus.png";
import wildWestSkullPath from "/slots/ww-skull.png";
import wildWestTrainPath from "/slots/ww-train.png";
import wildWestSheriffPath from "/slots/ww-sheriff.png";
import wildWestClintPath from "/slots/ww-clint.png";
import wildWestDynamitePath from "/slots/ww-dynamite.png";
import wildWestColtPath from "/slots/ww-colt.png";
import wildWestGoldPath from "/slots/ww-gold.png";

const entries: PaytableEntry[] = [
  {
    isWildcard: false,
    streaks: {
      3: 1,
      4: 5,
      5: 10,
    },
    rarity: 1,
    textureUrl: wildWestCactusPath,
  },
  {
    isWildcard: false,
    streaks: {
      3: 1,
      4: 5,
      5: 10,
    },
    rarity: 1,
    textureUrl: wildWestSkullPath,
  },
  {
    isWildcard: false,
    streaks: {
      3: 1,
      4: 5,
      5: 10,
    },
    rarity: 1,
    textureUrl: wildWestTrainPath,
  },
  {
    isWildcard: false,
    streaks: {
      3: 1,
      4: 5,
      5: 10,
    },
    rarity: 1,
    textureUrl: wildWestSheriffPath,
  },
  {
    isWildcard: false,
    streaks: {
      3: 1,
      4: 5,
      5: 10,
    },
    rarity: 1,
    textureUrl: wildWestSheriffPath
  },
  {
    isWildcard: true,
    streaks: {
      3: 50,
      4: 500,
      5: 1000,
    },
    rarity: 3,
    textureUrl: wildWestClintPath,
  },
  {
    isWildcard: false,
    streaks: {
      3: 25,
      4: 250,
      5: 500,
    },
    rarity: 2,
    textureUrl: wildWestDynamitePath
  },
  {
    isWildcard: false,
    streaks: {
      3: 25,
      4: 250,
      5: 500,
    },
    rarity: 2,
    textureUrl: wildWestColtPath,
  },
  {
    isWildcard: false,
    streaks: {
      3: 25,
      4: 250,
      5: 500,
    },
    rarity: 2,
    textureUrl: wildWestGoldPath,
  },
];

async function getWildWestPaytable() {
  await Assets.load(wildWestHorseShoePath);
  const wildWestPaytable = new Paytable(entries, wildWestHorseShoePath);
  await wildWestPaytable.init();
  return wildWestPaytable;
}

export default getWildWestPaytable;

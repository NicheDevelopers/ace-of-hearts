import { Assets } from "pixi.js";
import { Paytable, PaytableEntry } from "../Paytable";
import wildWestHorseShoePath from "/slots/pom-horseshoe.png";

import privatePath from "/slots/pom-private.png";
import skipper from "/slots/pom-skipper.png";
import kowalski from "/slots/pom-kowalski.png";
import rico from "/slots/pom-rico.png";
import marlene from "/slots/pom-marlene.png";
import julian from "/slots/pom-julian.png";
import mort from "/slots/pom-mort.png";
import morris from "/slots/pom-morris.png";
import alice from "/slots/pom-alice.png";

const entries: PaytableEntry[] = [
  {
    isWildcard: false,
    streaks: {
      3: 1,
      4: 5,
      5: 10,
    },
    rarity: 1,
    textureUrl: privatePath,
  },
  {
    isWildcard: false,
    streaks: {
      3: 1,
      4: 5,
      5: 10,
    },
    rarity: 1,
    textureUrl: skipper,
  },
  {
    isWildcard: false,
    streaks: {
      3: 1,
      4: 5,
      5: 10,
    },
    rarity: 1,
    textureUrl: kowalski,
  },
  {
    isWildcard: false,
    streaks: {
      3: 1,
      4: 5,
      5: 10,
    },
    rarity: 1,
    textureUrl: rico,
  },
  {
    isWildcard: false,
    streaks: {
      3: 1,
      4: 5,
      5: 10,
    },
    rarity: 1,
    textureUrl: marlene,
  },
  {
    isWildcard: true,
    streaks: {
      3: 50,
      4: 500,
      5: 1000,
    },
    rarity: 3,
    textureUrl: julian,
  },
  {
    isWildcard: false,
    streaks: {
      3: 25,
      4: 250,
      5: 500,
    },
    rarity: 2,
    textureUrl: mort,
  },
  {
    isWildcard: false,
    streaks: {
      3: 25,
      4: 250,
      5: 500,
    },
    rarity: 2,
    textureUrl: morris,
  },
  {
    isWildcard: false,
    streaks: {
      3: 25,
      4: 250,
      5: 500,
    },
    rarity: 2,
    textureUrl: alice,
  },
];

async function getPenguinsPaytable() {
  await Assets.load(wildWestHorseShoePath);
  const penguinsPaytable = new Paytable(entries, wildWestHorseShoePath);
  await penguinsPaytable.init();
  return penguinsPaytable;
}

export default getPenguinsPaytable;

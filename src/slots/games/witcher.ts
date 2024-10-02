import { Assets } from "pixi.js";
import { Paytable, PaytableEntry } from "../Paytable";
import witcherHorseshoePath from "/slots/witcher-background.png";

import aardPath from "/slots/witcher-aard.png";
import igniPath from "/slots/witcher-igni.png";
import axiiPath from "/slots/witcher-axii.png";
import quenPath from "/slots/witcher-quen.png";
import yrdenPath from "/slots/witcher-yrden.png";
import geraltPath from "/slots/geralt.png";
import yenneferPath from "/slots/yennefer.png";
// import zoltanPath from "/slots/zoltan.png";
import trissPath from "/slots/triss.png";

const witcherEntries: PaytableEntry[] = [
  {
    isWildcard: false,
    streaks: {
      3: 2,
      4: 15,
      5: 50,
    },
    rarity: 1,
    textureUrl: aardPath,
  },
  {
    isWildcard: false,
    streaks: {
      3: 2,
      4: 15,
      5: 50,
    },
    rarity: 1,
    textureUrl: igniPath,
  },
  {
    isWildcard: false,
    streaks: {
      3: 2,
      4: 15,
      5: 50,
    },
    rarity: 1,
    textureUrl: axiiPath,
  },
  {
    isWildcard: false,
    streaks: {
      3: 2,
      4: 15,
      5: 50,
    },
    rarity: 1,
    textureUrl: quenPath,
  },
  {
    isWildcard: false,
    streaks: {
      3: 2,
      4: 15,
      5: 50,
    },
    rarity: 1,
    textureUrl: yrdenPath,
  },
  {
    isWildcard: true,
    streaks: {
      3: 250,
      4: 1000,
      5: 2500,
    },
    rarity: 3,
    textureUrl: geraltPath,
  },
  {
    isWildcard: false,
    streaks: {
      3: 50,
      4: 200,
      5: 1000,
    },
    rarity: 2,
    textureUrl: yenneferPath,
  },
  // {
  //   isWildcard: false,
  //   streaks: {
  //     3: 50,
  //     4: 200,
  //     5: 1000,
  //   },
  //   rarity: 2,
  //   textureUrl: zoltanPath
  // },
  {
    isWildcard: false,
    streaks: {
      3: 50,
      4: 200,
      5: 1000,
    },
    rarity: 2,
    textureUrl: trissPath
  },
];

async function getWitcherPaytable() {
  await Assets.load(witcherHorseshoePath);
  const witcherPaytable = new Paytable(witcherEntries, witcherHorseshoePath);
  await witcherPaytable.init();
  return witcherPaytable;
}

export default getWitcherPaytable;

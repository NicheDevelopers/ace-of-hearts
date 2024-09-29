import { Assets } from "pixi.js";
import { Paytable, PaytableEntry } from "../Paytable";
import witcherHorseshoePath from "/slots/witcher-background.png";

const witcherEntries: PaytableEntry[] = [
  {
    isWildcard: false,
    streaks: {
      3: 2,
      4: 15,
      5: 50,
    },
    rarity: 1,
    textureUrl: "http://localhost:3000/slots/witcher-aard.png",
  },
  {
    isWildcard: false,
    streaks: {
      3: 2,
      4: 15,
      5: 50,
    },
    rarity: 1,
    textureUrl: "http://localhost:3000/slots/witcher-igni.png",
  },
  {
    isWildcard: false,
    streaks: {
      3: 2,
      4: 15,
      5: 50,
    },
    rarity: 1,
    textureUrl: "http://localhost:3000/slots/witcher-axii.png",
  },
  {
    isWildcard: false,
    streaks: {
      3: 2,
      4: 15,
      5: 50,
    },
    rarity: 1,
    textureUrl: "http://localhost:3000/slots/witcher-quen.png",
  },
  {
    isWildcard: false,
    streaks: {
      3: 2,
      4: 15,
      5: 50,
    },
    rarity: 1,
    textureUrl: "http://localhost:3000/slots/witcher-yrden.png",
  },
  {
    isWildcard: true,
    streaks: {
      3: 250,
      4: 1000,
      5: 2500,
    },
    rarity: 3,
    textureUrl: "http://localhost:3000/slots/geralt.png",
  },
  {
    isWildcard: false,
    streaks: {
      3: 50,
      4: 200,
      5: 1000,
    },
    rarity: 2,
    textureUrl: "http://localhost:3000/slots/yennefer.png",
  },
  // {
  //   isWildcard: false,
  //   streaks: {
  //     3: 50,
  //     4: 200,
  //     5: 1000,
  //   },
  //   rarity: 2,
  //   textureUrl: "http://localhost:3000/slots/zoltan.png",
  // },
  {
    isWildcard: false,
    streaks: {
      3: 50,
      4: 200,
      5: 1000,
    },
    rarity: 2,
    textureUrl: "http://localhost:3000/slots/triss.png",
  },
];

await Assets.load(witcherHorseshoePath);
const witcherPaytable = new Paytable(witcherEntries, witcherHorseshoePath);
await witcherPaytable.init();

export default witcherPaytable;

import { Assets } from "pixi.js";
import { Paytable, PaytableEntry } from "../Paytable";
import wildWestHorseShoePath from "/slots/ww-horseshoe.png";

const entries: PaytableEntry[] = [
  {
    isWildcard: false,
    streaks: {
      3: 1,
      4: 5,
      5: 10,
    },
    rarity: 1,
    textureUrl: "http://localhost:3000/slots/ww-cactus.png",
  },
  {
    isWildcard: false,
    streaks: {
      3: 1,
      4: 5,
      5: 10,
    },
    rarity: 1,
    textureUrl: "http://localhost:3000/slots/ww-skull.png",
  },
  {
    isWildcard: false,
    streaks: {
      3: 1,
      4: 5,
      5: 10,
    },
    rarity: 1,
    textureUrl: "http://localhost:3000/slots/ww-train.png",
  },
  {
    isWildcard: false,
    streaks: {
      3: 1,
      4: 5,
      5: 10,
    },
    rarity: 1,
    textureUrl: "http://localhost:3000/slots/ww-cactus.png",
  },
  {
    isWildcard: false,
    streaks: {
      3: 1,
      4: 5,
      5: 10,
    },
    rarity: 1,
    textureUrl: "http://localhost:3000/slots/ww-sheriff.png",
  },
  {
    isWildcard: true,
    streaks: {
      3: 50,
      4: 500,
      5: 1000,
    },
    rarity: 3,
    textureUrl: "http://localhost:3000/slots/ww-clint.png",
  },
  {
    isWildcard: false,
    streaks: {
      3: 25,
      4: 250,
      5: 500,
    },
    rarity: 2,
    textureUrl: "http://localhost:3000/slots/ww-dynamite.png",
  },
  {
    isWildcard: false,
    streaks: {
      3: 25,
      4: 250,
      5: 500,
    },
    rarity: 2,
    textureUrl: "http://localhost:3000/slots/ww-colt.png",
  },
  {
    isWildcard: false,
    streaks: {
      3: 25,
      4: 250,
      5: 500,
    },
    rarity: 2,
    textureUrl: "http://localhost:3000/slots/ww-gold.png",
  },
];

await Assets.load(wildWestHorseShoePath);
const wildWestPaytable = new Paytable(entries, wildWestHorseShoePath);
await wildWestPaytable.init();

export default wildWestPaytable;

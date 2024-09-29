import { Assets } from "pixi.js";
import { Paytable, PaytableEntry } from "../Paytable";
import wildWestHorseShoePath from "/slots/pom-horseshoe.png";

const entries: PaytableEntry[] = [
  {
    isWildcard: false,
    streaks: {
      3: 1,
      4: 5,
      5: 10,
    },
    rarity: 1,
    textureUrl: "http://localhost:3000/slots/pom-private.png",
  },
  {
    isWildcard: false,
    streaks: {
      3: 1,
      4: 5,
      5: 10,
    },
    rarity: 1,
    textureUrl: "http://localhost:3000/slots/pom-skipper.png",
  },
  {
    isWildcard: false,
    streaks: {
      3: 1,
      4: 5,
      5: 10,
    },
    rarity: 1,
    textureUrl: "http://localhost:3000/slots/pom-kowalski.png",
  },
  {
    isWildcard: false,
    streaks: {
      3: 1,
      4: 5,
      5: 10,
    },
    rarity: 1,
    textureUrl: "http://localhost:3000/slots/pom-rico.png",
  },
  {
    isWildcard: false,
    streaks: {
      3: 1,
      4: 5,
      5: 10,
    },
    rarity: 1,
    textureUrl: "http://localhost:3000/slots/pom-marlene.png",
  },
  {
    isWildcard: true,
    streaks: {
      3: 50,
      4: 500,
      5: 1000,
    },
    rarity: 3,
    textureUrl: "http://localhost:3000/slots/pom-julian.png",
  },
  {
    isWildcard: false,
    streaks: {
      3: 25,
      4: 250,
      5: 500,
    },
    rarity: 2,
    textureUrl: "http://localhost:3000/slots/pom-mort.png",
  },
  {
    isWildcard: false,
    streaks: {
      3: 25,
      4: 250,
      5: 500,
    },
    rarity: 2,
    textureUrl: "http://localhost:3000/slots/pom-morris.png",
  },
  {
    isWildcard: false,
    streaks: {
      3: 25,
      4: 250,
      5: 500,
    },
    rarity: 2,
    textureUrl: "http://localhost:3000/slots/pom-alice.png",
  },
];

await Assets.load(wildWestHorseShoePath);
const penguinsPaytable = new Paytable(entries, wildWestHorseShoePath);
await penguinsPaytable.init();

export default penguinsPaytable;

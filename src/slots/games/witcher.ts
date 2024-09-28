import { Paytable, PaytableEntry } from "../Paytable";

const witcherEntries: PaytableEntry[] = [
  {
    isWildcard: false,
    streaks: {
      3: 25,
      4: 50,
      5: 100,
    },
    textureUrl: "http://localhost:3000/slots/witcher-aard.png",
  },
  {
    isWildcard: false,
    streaks: {
      3: 5,
      4: 10,
      5: 15,
    },
    textureUrl: "http://localhost:3000/slots/witcher-igni.png",
  },
  {
    isWildcard: false,
    streaks: {
      3: 75,
      4: 150,
      5: 200,
    },
    textureUrl: "http://localhost:3000/slots/witcher-axii.png",
  },
  {
    isWildcard: false,
    streaks: {
      3: 250,
      4: 500,
      5: 1000,
    },
    textureUrl: "http://localhost:3000/slots/witcher-quen.png",
  },
  {
    isWildcard: false,
    streaks: {
      3: 250,
      4: 500,
      5: 1000,
    },
    textureUrl: "http://localhost:3000/slots/witcher-yrden.png",
  },
];
const witcherPaytable = new Paytable(witcherEntries);
await witcherPaytable.init();

export default witcherPaytable;
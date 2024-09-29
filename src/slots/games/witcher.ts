import { Paytable, PaytableEntry } from "../Paytable";

const witcherEntries: PaytableEntry[] = [
  {
    isWildcard: false,
    streaks: {
      3: 1,
      4: 5,
      5: 10,
    },
    textureUrl: "http://localhost:3000/slots/witcher-aard.png",
  },
  {
    isWildcard: false,
    streaks: {
      3: 1,
      4: 5,
      5: 10,
    },
    textureUrl: "http://localhost:3000/slots/witcher-igni.png",
  },
  {
    isWildcard: false,
    streaks: {
      3: 1,
      4: 5,
      5: 10,
    },
    textureUrl: "http://localhost:3000/slots/witcher-axii.png",
  },
  {
    isWildcard: false,
    streaks: {
      3: 1,
      4: 5,
      5: 10,
    },
    textureUrl: "http://localhost:3000/slots/witcher-quen.png",
  },
  {
    isWildcard: false,
    streaks: {
      3: 1,
      4: 5,
      5: 10,
    },
    textureUrl: "http://localhost:3000/slots/witcher-yrden.png",
  },
  {
    isWildcard: true,
    streaks: {
      3: 50,
      4: 500,
      5: 1000,
    },
    textureUrl: "http://localhost:3000/slots/geralt.png",
  },
  {
    isWildcard: false,
    streaks: {
      3: 25,
      4: 250,
      5: 500,
    },
    textureUrl: "http://localhost:3000/slots/yennefer.png",
  },
  {
    isWildcard: false,
    streaks: {
      3: 25,
      4: 250,
      5: 500,
    },
    textureUrl: "http://localhost:3000/slots/zoltan.png",
  },
  {
    isWildcard: false,
    streaks: {
      3: 25,
      4: 250,
      5: 500,
    },
    textureUrl: "http://localhost:3000/slots/triss.png",
  },
];
const witcherPaytable = new Paytable(witcherEntries);
await witcherPaytable.init();

export default witcherPaytable;
import { Paytable, PaytableEntry } from "../Paytable";

const pixiEntries: PaytableEntry[] = [
  {
    isWildcard: false,
    streaks: {
      3: 25,
      4: 50,
      5: 100,
    },
    textureUrl: "https://pixijs.com/assets/eggHead.png",
  },
  {
    isWildcard: false,
    streaks: {
      3: 5,
      4: 10,
      5: 15,
    },
    textureUrl: "https://pixijs.com/assets/flowerTop.png",
  },
  {
    isWildcard: false,
    streaks: {
      3: 75,
      4: 150,
      5: 200,
    },
    textureUrl: "https://pixijs.com/assets/helmlok.png",
  },
  {
    isWildcard: false,
    streaks: {
      3: 250,
      4: 500,
      5: 1000,
    },
    textureUrl: "https://pixijs.com/assets/skully.png",
  },
];
const pixiPaytable = new Paytable(pixiEntries);
console.log("pixi init");
await pixiPaytable.init();
console.log("done pixi init");

export default pixiPaytable;

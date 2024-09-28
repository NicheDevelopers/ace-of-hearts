import * as PIXI from "pixi.js";
import slotsBorderPath from "/slots/slots-border.png";
import slotsHubPath from "/slots/slots-hub.png";

await Assets.load([slotsBorderPath, slotsHubPath]);

const slotsStage = new PIXI.Container();

const slotsBorderTexture = PIXI.Texture.from(slotsBorderPath);
const slotsBorder = new PIXI.Sprite(slotsBorderTexture);

slotsBorder.anchor.set(0);
slotsBorder.x = 0;
slotsBorder.y = 0;
slotsBorder.width = 1920;
slotsBorder.height = 1080;

const slotsHubTexture = PIXI.Texture.from(slotsHubPath);
const slotsHub = new PIXI.Sprite(slotsHubTexture);

slotsHub.anchor.set(0, 1);
slotsHub.x = 0;
slotsHub.y = 1080;
slotsHub.width = 1920;
slotsHub.height = 180;

interface Reel {
  container: Container;
  symbols: OurSprite[];
  position: number;
  previousPosition: number;
  blur: BlurFilter;
}

interface Tween {
  object: any;
  property: any;
  propertyBeginValue: any;
  target: any;
  easing: any;
  time: any;
  change: any;
  complete: any;
  start: any;
}

type OurSprite = Sprite & { symbolId: number };

import {
  Assets,
  Color,
  Container,
  Texture,
  Sprite,
  Graphics,
  Text,
  TextStyle,
  BlurFilter,
  FillGradient,
} from "pixi.js";
import app from "../app";
import pixiPaytable from "./games/pixi";
import witcherPaytable from "./games/witcher";
import getLines, { Line } from "./slots-logic";
import { getLineScore } from "./scoring";
import moneyManager from "../MoneyManager";

function getLineGraphics(line: Line) {
  const lineGraphics = new Graphics();
  lineGraphics.setStrokeStyle({ width: 15, color: line.color });

  lineGraphics.moveTo(
    SYMBOL_SIZE / 2,
    line.heights[0] * SYMBOL_SIZE + SYMBOL_SIZE / 2,
  );

  for (let i = 1; i < line.heights.length; i++) {
    lineGraphics.lineTo(
      i * REEL_WIDTH + SYMBOL_SIZE / 2,
      line.heights[i] * SYMBOL_SIZE + SYMBOL_SIZE / 2,
    );
  }
  lineGraphics.stroke();

  return lineGraphics;
}

let CURRENT_GAME = witcherPaytable;

const REEL_WIDTH = 200;
const SYMBOL_SIZE = 180;
const VISIBLE_ROWS = 4; // Increase this value to show more rows
const REELS_COUNT = 5;
const BET_AMOUNT = 25;

// Create different slot symbols
const slotTextures = CURRENT_GAME.getTextures();

// Build the reels
const reels = [] as Reel[];
const reelContainer = new Container();

function setupReels() {
  for (let i = 0; i < 5; i++) {
    const rc = new Container();

    rc.x = i * REEL_WIDTH;
    reelContainer.addChild(rc);

    const reel = {
      container: rc,
      symbols: [],
      position: 0,
      previousPosition: 0,
      blur: new BlurFilter(),
    } as Reel;

    reel.blur.blurX = 0;
    reel.blur.blurY = 0;
    rc.filters = [reel.blur];

    // Build the symbols
    for (let j = 0; j < VISIBLE_ROWS + 1; j++) {
      const symbolId = Math.floor(Math.random() * slotTextures.length);
      const symbol = new Sprite(slotTextures[symbolId]) as OurSprite;

      symbol.symbolId = symbolId;

      symbol.y = j * SYMBOL_SIZE;
      symbol.scale.x = symbol.scale.y = Math.min(
        SYMBOL_SIZE / symbol.width,
        SYMBOL_SIZE / symbol.height,
      );
      symbol.x = Math.round((SYMBOL_SIZE - symbol.width) / 2);
      reel.symbols.push(symbol);
      rc.addChild(symbol);
    }
    reels.push(reel);
  }
  slotsStage.addChild(slotsBorder);
  // slotsHub is added later to be on the top
  slotsStage.addChild(reelContainer);

  // Adjust margins and positioning
  const margin = (app.screen.height - SYMBOL_SIZE * VISIBLE_ROWS) / 2;

  reelContainer.y = margin;
  reelContainer.x = Math.round((app.screen.width - REEL_WIDTH * 5) / 2 + 10);

  // Create top header
  const TOP_HEADER_HEIGHT = SYMBOL_SIZE; // Height of the top header
  const topHeader = new Graphics()
    .rect(0, 0, app.screen.width, margin)
    .fill({ color: 0x0000ff }); // Black background

  // Add header text
  const headerStyle = new TextStyle({
    fontFamily: "Arial",
    fontSize: 36,
    fontStyle: "italic",
    fontWeight: "bold",
    fill: 0xffffff, // White text
    stroke: { color: 0x4a1850, width: 5 },
    dropShadow: {
      color: 0x000000,
      angle: Math.PI / 6,
      blur: 4,
      distance: 6,
    },
  });

  const headerText = new Text("Slot Machine", headerStyle);
  headerText.x = Math.round((topHeader.width - headerText.width) / 2);
  headerText.y = Math.round((TOP_HEADER_HEIGHT - headerText.height) / 2);

  topHeader.addChild(headerText);

  const bottom = new Graphics()
    .rect(0, SYMBOL_SIZE * VISIBLE_ROWS + margin, app.screen.width, margin)
    .fill({ color: "#00000000" });

  // Create gradient fill
  const fill = new FillGradient(0, 0, 0, 36 * 1.7);

  const colors = [0xffffff, 0x00ff99].map((color) =>
    Color.shared.setValue(color).toNumber(),
  );

  colors.forEach((number, index) => {
    const ratio = index / colors.length;

    fill.addColorStop(ratio, number);
  });

  // Add play text
  const style = new TextStyle({
    fontFamily: "Arial",
    fontSize: 36,
    fontStyle: "italic",
    fontWeight: "bold",
    fill: { fill },
    stroke: { color: 0x4a1850, width: 5 },
    dropShadow: {
      color: 0x000000,
      angle: Math.PI / 6,
      blur: 4,
      distance: 6,
    },
    wordWrap: true,
    wordWrapWidth: 2040,
  });

  const playText = new Text("Spin the wheels!", style);

  playText.x = Math.round((bottom.width - playText.width) / 2);
  playText.y =
    app.screen.height - margin + Math.round((margin - playText.height) / 2);
  bottom.addChild(playText);

  slotsStage.addChild(topHeader);
  slotsStage.addChild(slotsHub);
  slotsStage.addChild(bottom);

  // Set the interactivity.
  bottom.eventMode = "static";
  bottom.cursor = "pointer";
  bottom.addListener("pointerdown", () => {
    startPlay();
  });

  document.addEventListener('keydown', (event) => {
    if (event.code === "Space") startPlay();
  });
}

let running = false;
let endSymbolUrls: string[][] = [];

let highlightedLines: Graphics[] = [];

// Function to start playing.
function startPlay() {
  if (running) {
    console.log("running");
    return;
  }
  running = true;
  moneyManager.subtractMoney(BET_AMOUNT);
  console.log("Betting ", BET_AMOUNT);
  console.log("Current balance ", moneyManager.formatBalance());
  endSymbolUrls = [];
  highlightedLines.forEach((l) => reelContainer.removeChild(l));
  highlightedLines = [];

  for (let i = 0; i < reels.length; i++) {
    const r = reels[i];
    const target = r.position + 10 + i * 2;
    const time = 500 + i * 200;
    tweenTo(r, "position", target, time, backout(0.05), null, () => {
      const sortedReel = [...(r.symbols as OurSprite[])].sort(
        (a, b) => a.y - b.y,
      );
      // delete the first element - the one hidden behind the header
      sortedReel.shift();

      endSymbolUrls.push(sortedReel.map((s) => s.texture.label ?? "unknown"));
      if (i === reels.length - 1) reelsComplete();
    });
  }
}

// Reels done handler.
function reelsComplete() {
  running = false;

  // map to get the string content after the last slash
  console.log(
    endSymbolUrls.map((urls) => urls.map((url) => url.split("/").pop())),
  );

  endSymbolUrls; // <- tutaj array z url symboli które się wylosowały
  const lines = getLines(5, 4, 50);

  currentHighlight = 0;
  let totalScore = 0;

  for (const line of lines) {
    let symbolsOnLine: string[] = [];
    for (let i = 0; i < REELS_COUNT; i++) {
      symbolsOnLine.push(endSymbolUrls[i][line.heights[i]]);
    }
    const score = getLineScore(symbolsOnLine, CURRENT_GAME);
    totalScore += score;
    if (score > 0) {
      console.log(line, symbolsOnLine, score);
      highlightedLines.push(getLineGraphics(line));
    }
  }

  moneyManager.addMoney(totalScore);
  console.log("Won ", totalScore);
  console.log("Current balance: ", moneyManager.formatBalance());

  highlightLines();
}

// index of the currently highlighted line from highlightedLines
let currentHighlight = 0;

function highlightLines() {
  if (running || highlightedLines.length === 0) return;

  const child = highlightedLines[currentHighlight];

  reelContainer.addChild(child);

  setTimeout(() => {
    reelContainer.removeChild(child);
    currentHighlight = (currentHighlight + 1) % highlightedLines.length;
    highlightLines();
  }, 500);
}

// Listen for animate update.
app.ticker.add(() => {
  // Update the slots.
  for (let i = 0; i < reels.length; i++) {
    const r = reels[i];
    r.blur.blurY = (r.position - r.previousPosition) * 8;
    r.previousPosition = r.position;

    // Update symbol positions on reel.
    for (let j = 0; j < r.symbols.length; j++) {
      const s = r.symbols[j];
      const prevy = s.y;

      s.y = ((r.position + j) % r.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE;
      if (s.y < 0 && prevy > SYMBOL_SIZE * (VISIBLE_ROWS - 1)) {
        s.texture =
          slotTextures[Math.floor(Math.random() * slotTextures.length)];
        s.scale.x = s.scale.y = Math.min(
          SYMBOL_SIZE / s.texture.width,
          SYMBOL_SIZE / s.texture.height,
        );
        s.x = Math.round((SYMBOL_SIZE - s.width) / 2);
      }
    }
  }
});

// Very simple tweening utility function. This should be replaced with a proper tweening library in a real product.
const tweening = [] as Tween[];

function tweenTo(object, property, target, time, easing, onchange, oncomplete) {
  const tween = {
    object,
    property,
    propertyBeginValue: object[property],
    target,
    easing,
    time,
    change: onchange,
    complete: () => oncomplete(),
    start: Date.now(),
  } as Tween;

  tweening.push(tween);

  return tween;
}

// Listen for animate update.
app.ticker.add(() => {
  const now = Date.now();
  const remove = [] as Tween[];

  for (let i = 0; i < tweening.length; i++) {
    const t = tweening[i];
    const phase = Math.min(1, (now - t.start) / t.time);

    t.object[t.property] = lerp(
      t.propertyBeginValue,
      t.target,
      t.easing(phase),
    );
    if (t.change) t.change(t);
    if (phase === 1) {
      t.object[t.property] = t.target;
      if (t.complete) t.complete(t);
      remove.push(t);
    }
  }
  for (let i = 0; i < remove.length; i++) {
    tweening.splice(tweening.indexOf(remove[i]), 1);
  }
});

// Basic lerp funtion.
function lerp(a1, a2, t) {
  return a1 * (1 - t) + a2 * t;
}

// Backout function from tweenjs.
// https://github.com/CreateJS/TweenJS/blob/master/src/tweenjs/Ease.js
function backout(amount) {
  return (t) => --t * t * ((amount + 1) * t + amount) + 1;
}

setupReels();

export default slotsStage;

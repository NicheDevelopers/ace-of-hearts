import * as PIXI from "pixi.js";

const slotsStage = new PIXI.Container();

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

// Load the textures
await Assets.load([
  "https://pixijs.com/assets/eggHead.png",
  "https://pixijs.com/assets/flowerTop.png",
  "https://pixijs.com/assets/helmlok.png",
  "https://pixijs.com/assets/skully.png",
]);

const REEL_WIDTH = 200;
const SYMBOL_SIZE = 180;
const VISIBLE_ROWS = 4; // Increase this value to show more rows

// Create different slot symbols
const slotTextures = [
  Texture.from("https://pixijs.com/assets/eggHead.png"),
  Texture.from("https://pixijs.com/assets/flowerTop.png"),
  Texture.from("https://pixijs.com/assets/helmlok.png"),
  Texture.from("https://pixijs.com/assets/skully.png"),
];

// Build the reels
const reels = [];
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
    };

    reel.blur.blurX = 0;
    reel.blur.blurY = 0;
    rc.filters = [reel.blur];

    // Build the symbols
    for (let j = 0; j < VISIBLE_ROWS + 1; j++) {
      const symbol = new Sprite(
        slotTextures[Math.floor(Math.random() * slotTextures.length)],
      );

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
  slotsStage.addChild(reelContainer);

  // Adjust margins and positioning
  const margin = (app.screen.height - SYMBOL_SIZE * VISIBLE_ROWS) / 2;

  reelContainer.y = margin;
  reelContainer.x = Math.round((app.screen.width - REEL_WIDTH * 5) / 2);

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
    .fill({ color: 0xff0000 });

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
  slotsStage.addChild(bottom);

  // Set the interactivity.
  bottom.eventMode = "static";
  bottom.cursor = "pointer";
  bottom.addListener("pointerdown", () => {
    startPlay();
  });
}

let running = false;

// Function to start playing.
function startPlay() {
  if (running) return;
  running = true;

  for (let i = 0; i < reels.length; i++) {
    const r = reels[i];
    const extra = Math.floor(Math.random() * 3);
    const target = r.position + 10 + i * 5 + extra;
    const time = 2500 + i * 600 + extra * 600;

    tweenTo(
      r,
      "position",
      target,
      time,
      backout(0.5),
      null,
      i === reels.length - 1 ? reelsComplete : null,
    );
  }
}

// Reels done handler.
function reelsComplete() {
  running = false;
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
const tweening = [];

function tweenTo(object, property, target, time, easing, onchange, oncomplete) {
  const tween = {
    object,
    property,
    propertyBeginValue: object[property],
    target,
    easing,
    time,
    change: onchange,
    complete: oncomplete,
    start: Date.now(),
  };

  tweening.push(tween);

  return tween;
}

// Listen for animate update.
app.ticker.add(() => {
  const now = Date.now();
  const remove = [];

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

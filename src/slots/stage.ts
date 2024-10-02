import * as PIXI from "pixi.js";
import slotsBorderPath from "/slots/slots-border.png";
import slotsHubPath from "/slots/slots-hub-labeled.png";
import backgroundPath from "/slots/bigwin-background.png";
import witcherHorseshoePath from "/slots/witcher-background.png";
import plasterPath from "/slots/wooden-plaster.png";

import button from "/button.png";
import button_pressed from "/button_pressed.png";

import {
  Assets,
  Color,
  Container,
  Sprite,
  Graphics,
  Text,
  TextStyle,
  BlurFilter,
  FillGradient,
} from "pixi.js";
import getLines, { Line } from "./slots-logic";
import { getLineScore } from "./scoring";
import MoneyManager from "../MoneyManager";
import { FancyButton } from "@pixi/ui";
import getWitcherPaytable from "./games/witcher";
import getWildWestPaytable from "./games/wildWest";
import getPenguinsPaytable from "./games/penguins";

async function getSlotsStage(app: PIXI.Application, moneyManager: MoneyManager) {
  const [
    witcherPaytable,
    wildWestPaytable,
    penguinsPaytable
  ] = await Promise.all([
    getWitcherPaytable(),
    getWildWestPaytable(),
    getPenguinsPaytable()
  ]);
  console.log('games: ', witcherPaytable);

  await Assets.load([
    slotsBorderPath,
    slotsHubPath,
    backgroundPath,
    witcherHorseshoePath,
    plasterPath,
    button,
    button_pressed
  ]);

  const buttonAnimation = {
    hover: {
      props: {
        scale: {
          x: 1.1,
          y: 1.1,
        },
      },
      duration: 100,
    },
    pressed: {
      props: {
        scale: {
          x: 0.9,
          y: 0.9,
        },
      },
      duration: 100,
    },
  };

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

  // const witcherTexture = PIXI.Texture.from(witcherHorseshoePath);
  // const witcherHorseshoe = new PIXI.Sprite(witcherTexture);

  // witcherHorseshoe.anchor.set(0, 0);
  // witcherHorseshoe.x = 0;
  // witcherHorseshoe.y = 0;
  // witcherHorseshoe.width = 1920;
  // witcherHorseshoe.height = 1080;

  const plasterTexture = PIXI.Texture.from(plasterPath);
  const plaster = new PIXI.Sprite(plasterTexture);

  plaster.anchor.set(0, 0);
  plaster.x = 450;
  plaster.y = 163;
  plaster.width = 1022;
  plaster.height = 17;

  interface Reel {
    container: Container;
    symbols: Sprite[];
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

  const GAMES = [
    witcherPaytable,
    wildWestPaytable,
    penguinsPaytable,
  ];
  let CURRENT_GAME_IDX = 0;
  let CURRENT_GAME = GAMES[CURRENT_GAME_IDX];

  const REEL_WIDTH = 200;
  const SYMBOL_SIZE = 180;
  const VISIBLE_ROWS = 4; // Increase this value to show more rows
  const REELS_COUNT = 5;
  let LINE_COUNT = 50;
  let BET_AMOUNT = 25;
  let LAST_WIN = 0;

  // Build the reels
  let reels = [] as Reel[];
  let reelContainer = new Container();

  const winText = new PIXI.Text(`${LAST_WIN}`, {
    fontSize: 60,
    fill: 0xffffff,
  });
  winText.anchor.set(0.5);
  winText.position.set(1365, 995);
  winText.zIndex = 2;

  const creditsText = new PIXI.Text(`${moneyManager.getBalance()}`, {
    fontSize: 60,
    fill: 0xffffff,
  });
  creditsText.anchor.set(0.5);
  creditsText.position.set(632, 995);
  creditsText.zIndex = 2;

  function setupReels() {
    reels = [];
    reelContainer = new Container();
    slotsStage.removeChildren();
    reelContainer.removeChildren();
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
        const id = CURRENT_GAME.getRandomTextureIndex();
        const symbol = new Sprite(slotTextures[id]);

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
    slotsStage.addChild(CURRENT_GAME.horseShoeSprite);
    slotsStage.addChild(plaster);

    // Adjust margins and positioning
    const margin = (app.screen.height - SYMBOL_SIZE * VISIBLE_ROWS) / 2;

    reelContainer.y = margin;
    reelContainer.x = Math.round((app.screen.width - REEL_WIDTH * 5) / 2 + 10);

    const bottom = new Graphics()
      .rect(0, SYMBOL_SIZE * VISIBLE_ROWS + margin, app.screen.width, margin)
      .fill({ color: "#00000000" });

    const restartButton = new FancyButton({
      defaultView: button,
      pressedView: button_pressed,
      text: "SPIN",
      defaultTextScale: 3,
      scale: 0.5,
      animations: buttonAnimation,
    });
    restartButton.textView!.style.fill = { color: "#ffffff" };
    restartButton.anchor.set(0.5);
    restartButton.onPress.connect(() => startPlay());
    restartButton.x = 1700;
    restartButton.y = 980;
    restartButton.zIndex = 99;

    const betText = new PIXI.Text(`${BET_AMOUNT}`, {
      fontSize: 60,
      fill: 0xffffff,
    });
    betText.anchor.set(0.5);
    betText.position.set(1055, 995);
    betText.zIndex = 2;

    const betPlusButton = new FancyButton({
      defaultView: button,
      pressedView: button_pressed,
      text: "+",
      defaultTextScale: 10,
      scale: 0.25,
      animations: buttonAnimation,
    });
    betPlusButton.textView!.style.fill = { color: "#ffffff" };
    betPlusButton.anchor.set(0.5);
    betPlusButton.onPress.connect(() => {
      if (BET_AMOUNT + 5 > moneyManager.getBalance()) return;
      BET_AMOUNT += 5;
      betText.text = BET_AMOUNT;
      console.log("New bet amount", BET_AMOUNT);
    });
    betPlusButton.x = 1180;
    betPlusButton.y = 990;
    betPlusButton.zIndex = 99;

    const betMinusButton = new FancyButton({
      defaultView: button,
      pressedView: button_pressed,
      text: "-",
      defaultTextScale: 10,
      scale: 0.25,
      animations: buttonAnimation,
    });
    betMinusButton.textView!.style.fill = { color: "#ffffff" };
    betMinusButton.anchor.set(0.5);
    betMinusButton.onPress.connect(() => {
      if (BET_AMOUNT <= 5) return;
      BET_AMOUNT -= 5;
      betText.text = BET_AMOUNT;
      console.log("New bet amount", BET_AMOUNT);
    });
    betMinusButton.x = 930;
    betMinusButton.y = 990;
    betMinusButton.zIndex = 99;

    const linesText = new PIXI.Text(`${LINE_COUNT}`, {
      fontSize: 60,
      fill: 0xffffff,
    });
    linesText.anchor.set(0.5);
    linesText.position.set(225, 995);
    linesText.zIndex = 2;

    const linesPlusButton = new FancyButton({
      defaultView: button,
      pressedView: button_pressed,
      text: "+",
      defaultTextScale: 10,
      scale: 0.25,
      animations: buttonAnimation,
    });
    linesPlusButton.textView!.style.fill = { color: "#ffffff" };
    linesPlusButton.anchor.set(0.5);
    linesPlusButton.onPress.connect(() => {
      if (LINE_COUNT === 50) return;
      LINE_COUNT += 10;
      linesText.text = LINE_COUNT;
      console.log("New line count", LINE_COUNT);
    });
    linesPlusButton.x = 340;
    linesPlusButton.y = 990;
    linesPlusButton.zIndex = 99;

    const linesMinusButton = new FancyButton({
      defaultView: button,
      pressedView: button_pressed,
      text: "-",
      defaultTextScale: 10,
      scale: 0.25,
      animations: buttonAnimation,
    });
    linesMinusButton.textView!.style.fill = { color: "#ffffff" };
    linesMinusButton.anchor.set(0.5);
    linesMinusButton.onPress.connect(() => {
      if (LINE_COUNT <= 10) return;
      LINE_COUNT -= 10;
      linesText.text = LINE_COUNT;
      console.log("New line count", LINE_COUNT);
    });
    linesMinusButton.x = 110;
    linesMinusButton.y = 990;
    linesMinusButton.zIndex = 99;

    // Assusmes we switched game idx before calling
    const switchGame = () => {
      console.log("next game");
      console.log(CURRENT_GAME_IDX);
      CURRENT_GAME = GAMES[CURRENT_GAME_IDX % GAMES.length];
      console.log(CURRENT_GAME_IDX % GAMES.length);
      slotTextures = CURRENT_GAME.getTextures();
      highlightedLines = [];
      setupReels();
    };

    const nextGameButton = new FancyButton({
      defaultView: button,
      pressedView: button_pressed,
      text: "Next Game",
      defaultTextScale: 2,
      scale: 0.5,
      animations: buttonAnimation,
    });
    nextGameButton.textView!.style.fill = { color: "#ffffff" };
    nextGameButton.anchor.set(0.5);
    nextGameButton.onPress.connect(() => {
      if (running) return;
      CURRENT_GAME_IDX++;
      CURRENT_GAME_IDX = Math.abs(CURRENT_GAME_IDX);
      switchGame();
    });
    nextGameButton.x = 1920 - 100;
    nextGameButton.y = app.screen.height / 2;
    nextGameButton.zIndex = 99;

    bottom.addChild(betText);
    bottom.addChild(linesText);
    bottom.addChild(winText);
    bottom.addChild(creditsText);

    bottom.addChild(nextGameButton);

    bottom.addChild(restartButton);
    bottom.addChild(betPlusButton);
    bottom.addChild(betMinusButton);
    bottom.addChild(linesMinusButton);
    bottom.addChild(linesPlusButton);

    // Create gradient fill
    const fill = new FillGradient(0, 0, 0, 36 * 1.7);

    const colors = [0xffffff, 0x00ff99].map((color) =>
      Color.shared.setValue(color).toNumber(),
    );

    colors.forEach((number, index) => {
      const ratio = index / colors.length;

      fill.addColorStop(ratio, number);
    });

    slotsStage.addChild(slotsHub);
    slotsStage.addChild(bottom);

    document.addEventListener("keydown", (event) => {
      if (event.code === "Space") startPlay();
    });
  }

  let running = false;
  let bigWinAnim = false;
  let endSymbolUrls: string[][] = [];

  let highlightedLines: Graphics[] = [];

  // Function to start playing.
  function startPlay() {
    if (running) {
      console.log("running");
      return;
    }
    console.log("START PLAY");
    running = true;
    moneyManager.subtractMoney(BET_AMOUNT);
    creditsText.text = moneyManager.getBalance();
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
        const sortedReel = [...(r.symbols as Sprite[])].sort((a, b) => a.y - b.y);
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
    const lines = getLines(5, 4, LINE_COUNT);
    console.log(lines);

    currentHighlight = 0;
    let totalScore = 0;

    for (const line of lines) {
      let symbolsOnLine: string[] = [];
      for (let i = 0; i < REELS_COUNT; i++) {
        symbolsOnLine.push(endSymbolUrls[i][line.heights[i]]);
      }

      const score = getLineScore(
        symbolsOnLine,
        CURRENT_GAME,
        LINE_COUNT,
        BET_AMOUNT,
      );
      totalScore += score;
      winText.text = totalScore;
      if (score > 0) {
        highlightedLines.push(getLineGraphics(line));
      }
    }

    LAST_WIN = totalScore;
    moneyManager.addMoney(totalScore);
    creditsText.text = moneyManager.getBalance();
    console.log("Won ", totalScore);
    console.log("Current balance: ", moneyManager.formatBalance());

    highlightLines();

    if (totalScore > 1000) bigWin(totalScore);
  }

  // index of the currently highlighted line from highlightedLines
  let currentHighlight = 0;

  let slotTextures = CURRENT_GAME.getTextures();

  function highlightLines() {
    if ((running && !bigWinAnim) || highlightedLines.length === 0) return;

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
          s.texture = slotTextures[CURRENT_GAME.getRandomTextureIndex()];
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

  function bigWin(winAmount: number) {
    running = true;
    bigWinAnim = true;

    const backgroundTexture = PIXI.Texture.from(backgroundPath);
    const background = new PIXI.Sprite(backgroundTexture);

    background.anchor.set(0.5);
    background.x = app.screen.width / 2;
    background.y = app.screen.height / 2;
    background.width = 600;

    const animDuration = 5500;

    const fill = new FillGradient(0, 0, 0, 136 * 1.7);

    const colors = ["#ffffff", "#f2e72d", "#cc2222"].map((color) =>
      Color.shared.setValue(color).toNumber(),
    );

    colors.forEach((number, index) => {
      const ratio = index / colors.length;

      fill.addColorStop(ratio, number);
    });

    // Add play text
    const style = new TextStyle({
      fontFamily: "Arial",
      fontSize: 166,
      fontWeight: "bold",
      fill: { fill },
      stroke: { color: "#000000", width: 7 },
      dropShadow: {
        color: 0x000000,
        angle: Math.PI / 6,
        blur: 4,
        distance: 6,
      },
      wordWrap: true,
      wordWrapWidth: 2040,
    });
    const text =
      winAmount >= 5000 ? "GIGA WIN" : winAmount >= 2500 ? "HUGE WIN" : "BIG WIN";

    const bigWinText = new Text(text, style);

    const bigWinY = Math.round(app.screen.height / 2) - 65;

    bigWinText.anchor.set(0.5);
    bigWinText.x = Math.round(app.screen.width / 2);
    bigWinText.y = bigWinY;
    bigWinText.scale = 1.4;

    slotsStage.addChild(background);
    slotsStage.addChild(bigWinText);

    const startTime = new Date().valueOf();

    const startAmount = winAmount - 500;
    const bigWinAmount = new Text(String(startAmount), style);

    const bigWinAmountY = Math.round(app.screen.height / 2) + 85;
    bigWinAmount.anchor.set(0.5);
    bigWinAmount.x = Math.round(app.screen.width / 2);
    bigWinAmount.y = bigWinAmountY;
    bigWinAmount.style.fontSize = 110;

    slotsStage.addChild(bigWinAmount);

    const increaseAmount = () => {
      const timePassedPercent =
        (new Date().valueOf() - startTime) / (animDuration - 1500);
      const incrementedValue = Math.round(
        startAmount + (winAmount - startAmount) * timePassedPercent ** 0.1,
      );

      bigWinAmount.text = String(Math.min(incrementedValue, winAmount));
    };

    const pulsateBigWinSize = () => {
      const timePassed = new Date().valueOf() - startTime;
      const scaleMultiplier = 0.3;
      const scale = (timePassed % 500) * scaleMultiplier;
      const scaleChange =
        ((timePassed / 500) | 0) % 2 === 0
          ? scale / 500
          : scaleMultiplier - scale / 500;
      background.scale = 1 + scaleChange;
      bigWinText.scale = 1.4 + scaleChange * 1.4;
      bigWinText.y = bigWinY - scaleChange * 60;

      bigWinAmount.scale = 1 + scaleChange;
      bigWinAmount.y = bigWinAmountY + scaleChange * 80;
    };

    app.ticker.add(pulsateBigWinSize);

    app.ticker.add(increaseAmount);

    setTimeout(() => {
      slotsStage.removeChild(background);
      slotsStage.removeChild(bigWinText);
      slotsStage.removeChild(bigWinAmount);
      app.ticker.remove(pulsateBigWinSize);
      app.ticker.remove(increaseAmount);
      running = false;
      bigWinAnim = false;
    }, animDuration);
  }

  setupReels();

  return slotsStage;
}

export default getSlotsStage;

import * as PIXI from "pixi.js";
import { BlackjackGame } from "./game";
import app from "../app";

const blackjackStage = new PIXI.Container();

const game = new BlackjackGame();

//const startGameButton = new PIXI.Graphics();
//startGameButton.on('pointerdown', () => {
//    game = new BlackjackGame()
//});

const drawButton = new PIXI.Graphics();
drawButton.fill(0xff0000);
drawButton.rect(0, 0, 100, 50);
drawButton.fill();
drawButton.interactive = true;
drawButton.position.set(100, 100);
drawButton.on('mousedown', game.drawCard);
app.stage.addChild(drawButton);

export default blackjackStage;


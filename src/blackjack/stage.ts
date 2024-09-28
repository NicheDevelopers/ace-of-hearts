import * as PIXI from "pixi.js";
import { BlackjackGame, GameStates } from "./game";
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
app.stage.addChild(drawButton);
drawButton.on('pointerdown', () => {
    game.drawCard();
    if (game.getState() !== GameStates.CONTINUE) console.log(game.getState());
});

const passButton = new PIXI.Graphics();
passButton.fill(0xff0000);
passButton.rect(0, 0, 100, 50);
passButton.fill();
passButton.interactive = true;
passButton.position.set(300, 100);
app.stage.addChild(passButton);
passButton.on('pointerdown', () => {
    game.changeTurn();
    while (game.getState() === GameStates.CONTINUE){
        game.drawCard();
        console.log('Game state:', game.getState());
    }
});

export default blackjackStage;


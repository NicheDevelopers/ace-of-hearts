import * as PIXI from "pixi.js";
import app from "../app";
import { BlackjackGame, GameStates } from "./game";

const blackjackStage = new PIXI.Container();

const game = new BlackjackGame(blackjackStage);

const drawButton = new PIXI.Graphics();
drawButton.fill(0xff0000);
drawButton.rect(0, 0, 100, 50);
drawButton.fill();
drawButton.interactive = true;
drawButton.position.set(100, 100);
app.stage.addChild(drawButton);
drawButton.on('pointerdown', () => {
    if (game.finished) 
        return;
    game.drawCard();
    if (game.getState() !== GameStates.CONTINUE) 
        console.log(game.getState());
});

const passButton = new PIXI.Graphics();
passButton.fill(0xff0000);
passButton.rect(0, 0, 100, 50);
passButton.fill();
passButton.interactive = true;
passButton.position.set(300, 100);
app.stage.addChild(passButton);
passButton.on('pointerdown', () => {
    if (game.finished) 
        return;
    console.log('Passing turn');
    game.changeTurn();
    while (game.getState() === GameStates.CONTINUE){
        game.drawCard();
        console.log('Game state:', game.getState());
    }
    console.log('Game state after dealer moves:', game.getState());
});

const restartButton = new PIXI.Graphics();
restartButton.fill(0xff0000);
restartButton.rect(0, 0, 100, 50);
restartButton.fill();
restartButton.interactive = true;
restartButton.position.set(500, 100);
app.stage.addChild(restartButton);
restartButton.on('pointerdown', () => {
    console.log('Restarting game');
    game.restart();
});

export default blackjackStage;


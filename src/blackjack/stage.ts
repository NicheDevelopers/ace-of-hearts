import * as PIXI from "pixi.js";
import { BlackjackGame, GameStates } from "./game";
import { FancyButton } from "@pixi/ui";

const blackjackStage = new PIXI.Container();

const game = new BlackjackGame(blackjackStage);

import dziadu from '/dziadu.webp';
await PIXI.Assets.load([
    dziadu,
]);

const drawButton = new FancyButton({
    defaultView: dziadu,
    hoverView: dziadu,
    pressedView: dziadu,
    text: 'Draw',
    scale: 0.1,
    animations: {
         hover: {
             props: {
                 scale: {
                     x: 1.1,
                     y: 1.1,
                 }
             },
             duration: 100,
         },
         pressed: {
             props: {
                 scale: {
                     x: 0.9,
                     y: 0.9,
                 }
             },
             duration: 100,
         }
     }
});
drawButton.position.set(100, 100);
drawButton.onPress.connect(() => {
    if (game.finished) 
        return;
    game.drawCard();
    if (game.getState() !== GameStates.CONTINUE) 
        console.log(game.getState());
});
blackjackStage.addChild(drawButton);

const passButton = new FancyButton({
    defaultView: dziadu,
    hoverView: dziadu,
    pressedView: dziadu,
    text: 'Pass',
    scale: 0.1,
    animations: {
         hover: {
             props: {
                 scale: {
                     x: 1.1,
                     y: 1.1,
                 }
             },
             duration: 100,
         },
         pressed: {
             props: {
                 scale: {
                     x: 0.9,
                     y: 0.9,
                 }
             },
             duration: 100,
         }
     }
});
passButton.position.set(300, 100);
passButton.onPress.connect(() => {
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
blackjackStage.addChild(passButton);

const restartButton = new FancyButton({
    defaultView: dziadu,
    hoverView: dziadu,
    pressedView: dziadu,
    text: 'Restart',
    scale: 0.1,
    animations: {
         hover: {
             props: {
                 scale: {
                     x: 1.1,
                     y: 1.1,
                 }
             },
             duration: 100,
         },
         pressed: {
             props: {
                 scale: {
                     x: 0.9,
                     y: 0.9,
                 }
             },
             duration: 100,
         }
     }
});
restartButton.position.set(500, 100);
blackjackStage.addChild(restartButton);
restartButton.onPress.connect(() => {
    console.log('Restarting game');
    game.restart();
});

export default blackjackStage;


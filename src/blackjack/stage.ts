import * as PIXI from "pixi.js";
import { BlackjackGame, GameStates } from "./game";
import { FancyButton } from "@pixi/ui";

const blackjackStage = new PIXI.Container();

const game = new BlackjackGame(blackjackStage);

import hubPath from "/blackjack/blackjack-hub-labeled.png";

await PIXI.Assets.load([hubPath]);

const hubTexture = PIXI.Texture.from(hubPath);
const hub = new PIXI.Sprite(hubTexture);

hub.anchor.set(0, 1);
hub.x = 0;
hub.y = 1080;
hub.width = 1920;
hub.height = 180;
hub.zIndex = 1;

blackjackStage.addChild(hub);

import button from '/button.png';
import button_pressed from '/button_pressed.png';
await PIXI.Assets.load([
    button,
    button_pressed,
]);

const drawButton = new FancyButton({
    defaultView: button,
    hoverView: button_pressed,
    pressedView: button_pressed,
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
drawButton.position.set(1340, 990);
drawButton.onPress.connect(() => {
    if (game.finished) 
        return;
    game.drawCard();
    if (game.getState() !== GameStates.CONTINUE) 
        console.log(game.getState());
});
drawButton.zIndex = 2;
blackjackStage.addChild(drawButton);

const passButton = new FancyButton({
    defaultView: button,
    hoverView: button_pressed,
    pressedView: button_pressed,
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
passButton.position.set(1540, 990);
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
passButton.zIndex = 2;
blackjackStage.addChild(passButton);

const restartButton = new FancyButton({
    defaultView: button,
    hoverView: button_pressed,
    pressedView: button_pressed,
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
restartButton.position.set(1740, 990);
restartButton.onPress.connect(() => {
    console.log('Restarting game');
    game.restart();
});
restartButton.zIndex = 2;
blackjackStage.addChild(restartButton);

const plusBetButton = new FancyButton({
    defaultView: button,
    hoverView: button_pressed,
    pressedView: button_pressed,
    text: '+',
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
plusBetButton.position.set(1190, 955);
plusBetButton.onPress.connect(() => {
    game.bet = Math.min(game.bet + game.deltaBet, game.maxBet);
    betText.text = game.bet;
});
plusBetButton.zIndex = 2;
blackjackStage.addChild(plusBetButton);

const minusBetButton = new FancyButton({
    defaultView: button,
    hoverView: button_pressed,
    pressedView: button_pressed,
    text: '-',
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
minusBetButton.position.set(1190, 1025);
minusBetButton.onPress.connect(() => {
    game.bet = Math.max(game.bet - game.deltaBet, game.minBet);
    betText.text = game.bet;
});
minusBetButton.zIndex = 2;
blackjackStage.addChild(minusBetButton);

const betText = new PIXI.Text(`${game.bet}`, { fontSize: 60, fill: 0xFFFFFF });
betText.position.set(1025, 960);
betText.zIndex = 2;
blackjackStage.addChild(betText);

export default blackjackStage;


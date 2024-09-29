import * as PIXI from "pixi.js";
import { BlackjackGame, GameStates } from "./game";
import { FancyButton } from "@pixi/ui";

const blackjackStage = new PIXI.Container();

const game = new BlackjackGame(blackjackStage);

import hubPath from "/blackjack/blackjack-hub-labeled.png";
import tablePath from "/blackjack/blackjack-table.webp";
import tableFramePath from "/blackjack/clear-wood.webp";
import casinoBackground from "/blackjack/casino-background.jpg";

await PIXI.Assets.load([hubPath, tablePath, tableFramePath, casinoBackground]);

const backgroundTexture = PIXI.Texture.from(casinoBackground);
const background = new PIXI.Sprite(backgroundTexture);

background.anchor.set(0, 0);
background.x = 0;
background.y = -180;
background.width = 1920;
background.height = 1080;
background.zIndex = -2;
blackjackStage.addChild(background);

const hubTexture = PIXI.Texture.from(hubPath);
const hub = new PIXI.Sprite(hubTexture);

hub.anchor.set(0, 1);
hub.x = 0;
hub.y = 1080;
hub.width = 1920;
hub.height = 180;
hub.zIndex = 2;
blackjackStage.addChild(hub);

const tableTexture = PIXI.Texture.from(tablePath);
const table = new PIXI.Sprite(tableTexture);

table.anchor.set(0, 0);
table.x = 1000;
table.y = 200;
table.width = 920;
table.height = 700;
table.zIndex = 0;
blackjackStage.addChild(table);

const tableFrameTexture = PIXI.Texture.from(tableFramePath);
const tableFrame = new PIXI.Sprite(tableFrameTexture);

tableFrame.anchor.set(0, 0);
tableFrame.x = 970;
tableFrame.y = 170;
tableFrame.width = 970;
tableFrame.height = 750;
tableFrame.zIndex = -1;
blackjackStage.addChild(tableFrame);

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
    defaultTextScale: 2,
    scale: 0.3,
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
drawButton.position.set(1340, 960);
drawButton.zIndex = 2;
drawButton.onPress.connect(() => {
    if (game.finished) 
        return;
    game.drawCard();
});
drawButton.textView!.style.fill = 0xffffff;
blackjackStage.addChild(drawButton);

const passButton = new FancyButton({
    defaultView: button,
    hoverView: button_pressed,
    pressedView: button_pressed,
    text: 'Pass',
    defaultTextScale: 2,
    scale: 0.3,
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
passButton.position.set(1540, 960);
passButton.zIndex = 2;
passButton.onPress.connect(() => {
    if (game.finished) 
        return;
    game.changeTurn();
    while (game.getState() === GameStates.CONTINUE){
        game.drawCard();
    }
});
passButton.textView!.style.fill = 0xffffff;
blackjackStage.addChild(passButton);

const restartButton = new FancyButton({
    defaultView: button,
    hoverView: button_pressed,
    pressedView: button_pressed,
    text: 'Restart',
    defaultTextScale: 2,
    scale: 0.3,
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
restartButton.position.set(1740, 960);
restartButton.zIndex = 2;
restartButton.onPress.connect(() => {
    game.restart();
});
restartButton.textView!.style.fill = 0xffffff;
blackjackStage.addChild(restartButton);


const plusBetButton = new FancyButton({
    defaultView: button,
    hoverView: button_pressed,
    pressedView: button_pressed,
    text: '+',
    defaultTextScale: 15,
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
plusBetButton.textView!.style.fill = 0xffffff;
blackjackStage.addChild(plusBetButton);

const minusBetButton = new FancyButton({
    defaultView: button,
    hoverView: button_pressed,
    pressedView: button_pressed,
    text: '-',
    defaultTextScale: 15,
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
minusBetButton.textView!.style.fill = 0xffffff;
blackjackStage.addChild(minusBetButton);

const betText = new PIXI.Text(`${game.bet}`, { fontSize: 60, fill: 0xFFFFFF });
betText.position.set(1025, 960);
betText.zIndex = 2;
blackjackStage.addChild(betText);

export default blackjackStage;


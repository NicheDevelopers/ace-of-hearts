import * as PIXI from "pixi.js";
import { BlackjackGame } from "./game";
import { FancyButton } from "@pixi/ui";

import button from '/button.png';
import button_pressed from '/button_pressed.png';
import moneyManager from "../MoneyManager";
await PIXI.Assets.load([
    button,
    button_pressed,
]);

const blackjackStage = new PIXI.Container();

const dealerReplay = new PIXI.Text("", { fontSize: 40, fill: 0xFFFFFF });
dealerReplay.position.set(750, 80);
dealerReplay.zIndex = 2;
dealerReplay.visible = false;
blackjackStage.addChild(dealerReplay);

const youText = new PIXI.Text("YOU", { fontSize: 60, fill: 0xFFFFFF });
youText.anchor.set(1, 0);
youText.position.set(1870, 800);
youText.zIndex = 2;
blackjackStage.addChild(youText);

const dealerText = new PIXI.Text("DEALER", { fontSize: 60, fill: 0xFFFFFF });
dealerText.anchor.set(1, 0);
dealerText.position.set(1870, 370);
dealerText.zIndex = 2;
blackjackStage.addChild(dealerText);

const playerScoreText = new PIXI.Text("Score: ", { fontSize: 30, fill: 0xFFFFFF });
playerScoreText.anchor.set(1, 0);
playerScoreText.position.set(1870, 730);
playerScoreText.zIndex = 2;
blackjackStage.addChild(playerScoreText);

const dealerScoreText = new PIXI.Text("Score: ", { fontSize: 30, fill: 0xFFFFFF });
dealerScoreText.anchor.set(1, 0);
dealerScoreText.position.set(1870, 300);
dealerScoreText.zIndex = 2;
blackjackStage.addChild(dealerScoreText);

const creditsText = new PIXI.Text(`${moneyManager.getBalance()}`, { fontSize: 60, fill: 0xffffff });
creditsText.anchor.set(0.5);
creditsText.position.set(632, 995);
creditsText.zIndex = 3;
blackjackStage.addChild(creditsText);

const game = new BlackjackGame(
    blackjackStage, 
    dealerReplay, 
    dealerScoreText, 
    playerScoreText
);

import hubPath from "/blackjack/blackjack-hub-labeled.png";
import tablePath from "/blackjack/blackjack-table.webp";
import tableFramePath from "/blackjack/clear-wood.webp";
import casinoBackground from "/blackjack/casino-background.jpg";

import isabella from "/blackjack/dealers/isabella.png";
import lila from "/blackjack/dealers/lila.png";
import victoria from "/blackjack/dealers/victoria.png";
import { dealersAnswers, GameStates } from "./util";

await PIXI.Assets.load([hubPath, tablePath, tableFramePath, casinoBackground, isabella, lila, victoria]);
const dealers = { names: [isabella, lila, victoria], count: 0 };

let dealerTexture = PIXI.Texture.from(dealers.names[dealers.count]);
let dealer = new PIXI.Sprite(dealerTexture);

dealer.anchor.set(1, 1);
dealer.x = 800;
dealer.y = 900;
dealer.zIndex = 1;
dealer.scale = 1.25;
blackjackStage.addChild(dealer);

const changeDealerButton = new FancyButton({
    defaultView: button,
    hoverView: button_pressed,
    pressedView: button_pressed,
    text: 'Dealer',
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
changeDealerButton.position.set(75, 100);
changeDealerButton.zIndex = 3;
changeDealerButton.onPress.connect(() => {
    dealers.count = (dealers.count + 1) % dealers.names.length;
    dealerTexture = PIXI.Texture.from(dealers.names[dealers.count]);
    dealer.texture = dealerTexture;
});
changeDealerButton.textView!.style.fill = 0xffffff;
blackjackStage.addChild(changeDealerButton);

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
    creditsText.text = moneyManager.getBalance();
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
    if (game.getState() !== GameStates.CONTINUE) {
        dealerReplay.text = dealersAnswers[game.getState()][Math.floor(Math.random() * dealersAnswers[game.getState()].length)];
        dealerReplay.visible = true;
        setTimeout(() => {
            dealerReplay.text = "";
            dealerReplay.visible = false;
        }, 4000);
        creditsText.text = moneyManager.getBalance();
        return;
    }
    while (game.getState() === GameStates.CONTINUE){
        game.drawCard();
    }
    creditsText.text = moneyManager.getBalance();
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
    creditsText.text = moneyManager.getBalance();
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


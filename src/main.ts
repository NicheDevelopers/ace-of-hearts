import './style.css'
import dziadu from '/dziadu.webp';

import * as PIXI from 'pixi.js';
import app from './app';

import './slots/slots-logic.ts';

import slotsStage from './slots/stage.ts';
import blackjackStage from './blackjack/stage.ts';

import './MoneyManager';
import { FancyButton } from '@pixi/ui';

await PIXI.Assets.load([
  dziadu,
]);

// take sprite from public folder
//const sprite = PIXI.Sprite.from(dziadu);
//sprite.anchor.set(0.5);
//sprite.x = app.screen.width / 2;
//sprite.y = app.screen.height / 2;

// add the sprite to the stage
//blackjackStage.addChild(sprite);

// animate rotation of the sprite
//app.ticker.add(() => {
//  sprite.rotation += 0.01;
//});

enum Scenes {
  SLOTS,
  BLACKJACK,
};

let currentScene = Scenes.SLOTS;

function switchScene() {
  if (currentScene === Scenes.SLOTS) {
    app.stage.removeChild(slotsStage);
    app.stage.addChild(blackjackStage);
    currentScene = Scenes.BLACKJACK;
  } else {
    app.stage.removeChild(blackjackStage);
    app.stage.addChild(slotsStage);
    currentScene = Scenes.SLOTS;
  }

  console.log('current stage:', currentScene);
}

import button from '/button.png';
import button_pressed from '/button_pressed.png';

await PIXI.Assets.load([
    button,
    button_pressed,
]);

const buttonChangeState = new FancyButton({
  defaultView: button,
  hoverView: button_pressed,
  pressedView: button_pressed,
  text: 'Change scene',
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
})
buttonChangeState.anchor.set(1, 0);
buttonChangeState.position.set(1890, 30);
buttonChangeState.zIndex = 50;
buttonChangeState.onPress.connect(() => {
  switchScene();
});
buttonChangeState.textView!.style.fill = 0xffffff;
app.stage.addChild(buttonChangeState);

switchScene();

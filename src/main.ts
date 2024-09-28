import './style.css'
import dziadu from '/dziadu.webp';

import * as PIXI from 'pixi.js';
import app from './app';
import Button from './Button';

import './slots/slots-logic.ts';

import slotsStage from './slots/stage.ts';
import blackjackStage from './blackjack/stage.ts';

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

const button = new PIXI.Graphics();
button.fill(0xff0000);
button.rect(0, 0, 100, 50);
button.fill();
button.interactive = true;
button.position.set(10, 10);
app.stage.addChild(button);
// Event listener for the button click
button.on('pointerdown', switchScene);

switchScene();

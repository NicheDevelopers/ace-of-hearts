import './style.css'
import dziadu from '/dziadu.webp';

import * as PIXI from 'pixi.js';
import app from './app';

import './slots/slots-logic.ts';

import slotsStage from './slots/stage.ts';
import blackjackStage from './blackjack/stage.ts';

import './MoneyManager';

import OpenAI from 'openai';
import { OpenAIConfig } from './config.ts';

const client = new OpenAI(OpenAIConfig);

async function main() {
  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    messages: [{ role: 'user', content: 'A confident and assertive croupier who takes pride in her card-playing skills. She enjoys games like poker and blackjack, where she can demonstrate her expertise and strategic prowess. Victoria is known for her sharp tongue and competitive nature, often teasing and taunting players to test their mettle at the card table. While she may come across as intimidating, her passion for the game is undeniable, and she seeks worthy opponents to engage in high-stakes card games.' + 'Hi, i would like to play blackjack' }],
    model: 'gpt-3.5-turbo',
  };
  //const chatCompletion: OpenAI.Chat.ChatCompletion = await client.chat.completions.create(params);
  //console.log(chatCompletion);
}

await main();

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

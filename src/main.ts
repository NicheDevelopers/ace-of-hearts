import './style.css'
import dziadu from '/dziadu.webp';

import * as PIXI from 'pixi.js';
import app from './app';
import Button from './Button';

import './slots-logic.ts';

await PIXI.Assets.load([
  dziadu,
]);

// take sprite from public folder
const sprite = PIXI.Sprite.from(dziadu);
sprite.anchor.set(0.5);
sprite.x = app.screen.width / 2;
sprite.y = app.screen.height / 2;

// add the sprite to the stage
app.stage.addChild(sprite);

// animate rotation of the sprite
app.ticker.add(() => {
  sprite.rotation += 0.01;
});

const button = new Button({});
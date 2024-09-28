import * as PIXI from 'pixi.js';
const blackjack = require('blackjack-core');

const blackjackStage = new PIXI.Container();
const Game = blackjack.Game;
const actions = blackjack.actions;

const game = new Game();

console.log(game.getState());
game.dispatch(actions.deal());

export default blackjackStage;
import * as PIXI from "pixi.js";
import * as Blackjack from "engine-blackjack";

const blackjackStage = new PIXI.Container();
const Game = Blackjack.Game;
const actions = Blackjack.actions;

const game = new Game();

console.log(game.getState());
game.dispatch(actions.deal());

export default blackjackStage;


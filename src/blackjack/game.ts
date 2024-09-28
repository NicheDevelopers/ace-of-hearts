import { StandardDeck } from 'cards/build/decks/standard';
import { Card, decks } from 'cards';
import * as PIXI from 'pixi.js';
import { parseCardToString } from './parser';
import app from '../app';
import { CardImages } from './cardImages';

await PIXI.Assets.load(Object.values(CardImages));

export class BlackjackGame {
    blackjackStage: PIXI.Container<PIXI.ContainerChild>;
    deck: StandardDeck = new StandardDeck({ jokers: 0 });
    playerHand: BlackjackHand;
    crupierHand: BlackjackHand;
    turn: boolean = true;
    finished: boolean = false;
    constructor(blackjackStage: PIXI.Container<PIXI.ContainerChild>) {
        this.blackjackStage = blackjackStage;
        this.playerHand = new BlackjackHand(true, this.blackjackStage);
        this.crupierHand = new BlackjackHand(false, this.blackjackStage);
        this.restart();
    }

    restart() {
        this.blackjackStage.removeChild(...this.playerHand.cardsImg);
        this.blackjackStage.removeChild(...this.crupierHand.cardsImg);
        this.deck = new decks.StandardDeck({ jokers: 0 });
        this.deck.shuffleAll();
        this.playerHand = new BlackjackHand(true, this.blackjackStage);
        this.crupierHand = new BlackjackHand(false, this.blackjackStage);
        this.turn = true;
        this.playerHand.draw(this.deck.draw(2));
        this.crupierHand.draw(this.deck.draw(2));
        this.finished = false;
    }

    shuffle() {
        this.deck.shuffleAll();
    }

    changeTurn() {
        this.crupierHand.cardsImg[0].texture = PIXI.Texture.from(CardImages[parseCardToString(this.crupierHand.hand[0], false)]);
        this.turn = !this.turn;
    }

    drawCard() {
        (this.turn) ? 
            this.playerHand.draw(this.deck.draw(1)) 
            : this.crupierHand.draw(this.deck.draw(1));
    }

    getState(): string {
        if (this.turn){
            if (this.playerHand.score > 21) {
                const aces = this.playerHand.hand.filter((card) => card.rank.abbrn === 'A').length;
                const minScore = this.playerHand.score - (aces * 10);
                if (minScore > 21) {
                    this.crupierHand.cardsImg[0].texture = PIXI.Texture.from(CardImages[parseCardToString(this.crupierHand.hand[0], false)]);
                    this.finished = true;
                    return GameStates.PLAYER_LOST;
                }
            }
            if (this.playerHand.countCards() === 5) {
                this.finished = true;
                return GameStates.PLAYER_WIN;
            }
        }
        else {
            if (this.crupierHand.score > 21) {
                const aces = this.crupierHand.hand.filter((card) => card.rank.abbrn === 'A').length;
                const minScore = this.crupierHand.score - (aces * 10);
                if (minScore > 21) {
                    this.finished = true;
                    return GameStates.CRUPIER_LOST;
                }
                else if (this.crupierHand.countCards() === 5) {
                    this.finished = true;
                    return GameStates.CRUPIER_WIN;
                }
            }
            else {
                if (this.crupierHand.score > this.playerHand.score) {
                    this.finished = true;
                    return GameStates.CRUPIER_WIN;
                }
                if (this.crupierHand.score === this.playerHand.score && this.crupierHand.score > 15){
                    this.finished = true;
                    return GameStates.DRAW;
                }
            }
        }
        return GameStates.CONTINUE;
    }
}

export enum GameStates {
    CONTINUE = "Game goes on!",
    PLAYER_WIN = "Player win!",
    PLAYER_LOST = "Player lost!",
    CRUPIER_WIN = "Crupier win!",
    CRUPIER_LOST = "Crupier lost!",
    DRAW = "Draw!",
}

export const CardValues = {
    "A": 11,
    "K": 10,
    "Q": 10,
    "J": 10,
    "10": 10,
    "9": 9,
    "8": 8,
    "7": 7,
    "6": 6,
    "5": 5,
    "4": 4,
    "3": 3,
    "2": 2,
} as Record<string, number>;

export class BlackjackHand {
    blackjackStage: PIXI.Container<PIXI.ContainerChild>;
    isPlayer: boolean;
    hand: Card[];
    score: number;
    cardsImg: PIXI.Sprite[];
    constructor(isPlayer: boolean, blackjackStage: PIXI.Container<PIXI.ContainerChild>) {
        console.log('Blackjack hand started');
        this.blackjackStage = blackjackStage;
        this.hand = [];
        this.score = 0;
        this.isPlayer = isPlayer;
        this.cardsImg = [];
    }

    draw(cards: Card[]){
        cards.map((card) => {
            this.hand.push(card);
            this.score += CardValues[card.rank.abbrn];
            const hidden = (this.isPlayer) ? false : this.countCards() === 1;
            const sprite = PIXI.Sprite.from(CardImages[parseCardToString(card, hidden)]);
            if (!this.isPlayer) {
                sprite.x = app.screen.width / 4 + 60 * this.countCards() + Math.random() * 5;
                sprite.y = app.screen.height / 5;
                (Math.round(Math.random())) ?
                    sprite.rotation += Math.random() / 20 : sprite.rotation -= Math.random() / 20;
            }
            else {
                sprite.x = app.screen.width / 4 + 60 * this.countCards() + Math.random() * 5;
                sprite.y = app.screen.height / 5 * 3;
                (Math.round(Math.random())) ? 
                    sprite.rotation += Math.random() / 20 : sprite.rotation -= Math.random() / 20;
            }
            this.blackjackStage.addChild(sprite);
            this.cardsImg.push(sprite);
        })

        console.log((this.isPlayer) ? 'Player' : 'Crupier', 'hand', this.hand);
        console.log('Actual score: ', this.score, ' number of cards: ', this.countCards());
    }

    countCards(): number{
        return this.hand.length;
    }
}
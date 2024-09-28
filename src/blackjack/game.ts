import { StandardDeck } from 'cards/build/decks/standard';
import { Card, decks } from 'cards';
import * as PIXI from 'pixi.js';
import { parseCardToString } from './parser';
import blackjackStage from './stage';

await PIXI.Assets.load('../../public/blackjack-assets');

export class BlackjackGame {
    deck: StandardDeck = new StandardDeck({ jokers: 0 });
    playerHand: BlackjackHand = new BlackjackHand(true);
    crupierHand: BlackjackHand = new BlackjackHand(false);
    turn: boolean = true;
    finished: boolean = false;
    constructor() {
        this.restart();
    }

    restart() {
        this.deck = new decks.StandardDeck({ jokers: 0 });
        this.deck.shuffleAll();
        this.playerHand = new BlackjackHand(true);
        this.crupierHand = new BlackjackHand(false);
        this.turn = true;
        this.playerHand.draw(this.deck.draw(2));
        for (const card of this.playerHand.hand) {
            const sprite = PIXI.Sprite.from(parseCardToString(card, false));
            sprite.anchor.set(0.5, 0.5);
            blackjackStage.addChild(sprite);
            this.playerHand.cardsImg.push(sprite);
        }
        this.crupierHand.draw(this.deck.draw(2));
        for (const card of this.crupierHand.hand) {
            const sprite = PIXI.Sprite.from(parseCardToString(card, false));
            sprite.anchor.set(0.75, 0.5)
            blackjackStage.addChild(sprite);
            this.crupierHand.cardsImg.push(sprite);
        }
        this.finished = false;
    }

    shuffle() {
        this.deck.shuffleAll();
    }

    changeTurn() {
        this.turn = !this.turn;
    }

    drawCard() {
        (this.turn) ? this.playerHand.draw(this.deck.draw(1)) : this.crupierHand.draw(this.deck.draw(1));
    }

    getState(): string {
        if (this.turn){
            if (this.playerHand.score > 21) {
                const aces = this.playerHand.hand.filter((card) => card.rank.abbrn === 'A').length;
                const minScore = this.playerHand.score - (aces * 10);
                if (minScore > 21) {
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
    isPlayer: boolean;
    hand: Card[];
    score: number;
    cardsImg: PIXI.Sprite[];
    constructor(isPlayer: boolean) {
        console.log('Blackjack hand started');
        this.hand = [];
        this.score = 0;
        this.isPlayer = isPlayer;
        this.cardsImg = [];
    }

    draw(cards: Card[]){
        this.hand.push(...cards);

        cards.map((card) => {
            this.score += CardValues[card.rank.abbrn];
            const sprite = PIXI.Sprite.from(parseCardToString(card, false));
            (this.isPlayer) ? sprite.anchor.set(0.5, 0.5) : sprite.anchor.set(0.75, 0.5);
            blackjackStage.addChild(sprite);
            this.cardsImg.push(sprite);
        })

        console.log((this.isPlayer) ? 'Player' : 'Crupier', 'hand', this.hand);
        console.log('Actual score: ', this.score, ' number of cards: ', this.countCards());
    }

    countCards(): number{
        return this.hand.length;
    }
}
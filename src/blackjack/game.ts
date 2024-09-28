import { StandardDeck } from 'cards/build/decks/standard';
import { Card, decks } from 'cards';

export class BlackjackGame {
    deck: StandardDeck;
    turn: boolean;
    playerHand: BlackjackHand;
    crupierHand: BlackjackHand;
    constructor() {
        console.log('Blackjack game started');
        this.deck = new decks.StandardDeck({ jokers: 0 });
        this.deck.shuffleAll();
        this.playerHand = new BlackjackHand(true);
        this.crupierHand = new BlackjackHand(false);
        this.turn = true;
        this.playerHand.draw(this.deck.draw(2));
        this.crupierHand.draw(this.deck.draw(2));
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
            if (this.playerHand.score > 21)
                return GameStates.PLAYER_LOST;
            if (this.playerHand.countCards() === 5)
                return GameStates.PLAYER_WIN;
        }
        else {
            if (this.crupierHand.score > 21)
                return GameStates.CRUPIER_LOST;
            if (this.crupierHand.score > this.playerHand.score)
                return GameStates.CRUPIER_WIN;
            if (this.crupierHand.score === this.playerHand.score && this.crupierHand.score > 15)
                return GameStates.DRAW;
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
    constructor(isPlayer: boolean) {
        console.log('Blackjack hand started');
        this.hand = [];
        this.score = 0;
        this.isPlayer = isPlayer;
    }

    draw(cards: Card[]){
        this.hand.push(...cards);
        cards.map((card) => this.score += CardValues[card.rank.abbrn]);

        console.log((this.isPlayer) ? 'Player' : 'Crupier', 'hand', this.hand);
        console.log('Actual score: ', this.score, ' number of cards: ', this.countCards());
    }

    countCards(): number{
        return this.hand.length;
    }
}
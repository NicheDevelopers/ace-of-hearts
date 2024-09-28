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
        this.playerHand = new BlackjackHand();
        this.crupierHand = new BlackjackHand();
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

    drawCard(): string {
        if (this.turn)
            this.playerHand.draw(this.deck.draw(1));
            if (this.playerHand.score > 21)
                return 'Player Lost';
            if (this.playerHand.countCards() === 5)
                return 'Player Win';
        else {
            if (this.crupierHand.score > this.playerHand.score)
                return 'Crupier Win';
            if (this.crupierHand.score > 21)
                return 'Crupier Lost';
            else
                this.crupierHand.draw(this.deck.draw(1));
        }
        return 'undefined';
    }
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
    hand: Card[];
    score: number;
    constructor() {
        console.log('Blackjack hand started');
        this.hand = [];
        this.score = 0;
    }

    draw(cards: Card[]){
        console.log('Drawing cards: ', cards);
        this.hand.push(...cards);
        cards.map((card) => this.score += CardValues[card.rank.abbrn]);
    }

    countCards(): number{
        return this.hand.length;
    }
}
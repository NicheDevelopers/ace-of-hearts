import { StandardDeck } from 'cards/build/decks/standard';
import { Card, decks } from 'cards';
import * as PIXI from 'pixi.js';
import { parseCardToString } from './parser';
import { CardImages } from './cardImages';
import MoneyManager from '../MoneyManager';
import { CardValues, dealersAnswers, GameStates } from './util';

export class BlackjackGame {
    blackjackStage: PIXI.Container<PIXI.ContainerChild>;
    deck: StandardDeck = new StandardDeck({ jokers: 0 });
    playerHand: BlackjackHand;
    dealerHand: BlackjackHand;
    turn: boolean = true;
    finished: boolean = true;
    currentBet: number = 0;
    bet: number = 20;
    deltaBet: number = 10;
    minBet: number = 10;
    maxBet: number = 90;
    blackjackReplay: PIXI.Text;
    playerScore: PIXI.Text;
    dealerScore: PIXI.Text;
    app: PIXI.Application;
    moneyManager: MoneyManager;
    constructor(
        blackjackStage: PIXI.Container<PIXI.ContainerChild>, 
        blackjackReplay: PIXI.Text,
        dealerScore: PIXI.Text,
        playerScore: PIXI.Text,
        app: PIXI.Application,
        moneyManager: MoneyManager,
    ) {
        this.blackjackStage = blackjackStage;
        this.playerScore = playerScore;
        this.dealerScore = dealerScore;
        this.playerHand = new BlackjackHand(true, this.blackjackStage, this.playerScore, app);
        this.dealerHand = new BlackjackHand(false, this.blackjackStage, this.dealerScore, app);
        this.blackjackReplay = blackjackReplay;
        this.app = app;
        this.moneyManager = moneyManager;
    }

    restart() {
        this.moneyManager.subtractMoney(this.bet);
        this.currentBet = this.bet;
        this.blackjackStage.removeChild(...this.playerHand.cardsImg);
        this.blackjackStage.removeChild(...this.dealerHand.cardsImg);
        this.deck = new decks.StandardDeck({ jokers: 0 });
        this.deck.shuffleAll();
        this.playerHand = new BlackjackHand(true, this.blackjackStage, this.playerScore, this.app);
        this.dealerHand = new BlackjackHand(false, this.blackjackStage, this.dealerScore, this.app);
        this.turn = true;
        this.playerHand.draw(this.deck.draw(2));
        this.dealerHand.draw(this.deck.draw(2));
        this.dealerScore.text = 'Score: ?';
        this.finished = false;
    }

    shuffle() {
        this.deck.shuffleAll();
    }

    changeTurn() {
        this.showDealerHiddenCard();
        this.turn = !this.turn;
    }

    drawCard() {
        (this.turn) ? 
            this.playerHand.draw(this.deck.draw(1)) 
            : this.dealerHand.draw(this.deck.draw(1));
        const state = this.getState();
        if (state !== GameStates.CONTINUE) {
            this.blackjackReplay.text =
                    dealersAnswers[state][Math.floor(Math.random() * dealersAnswers[state].length)];
            if (state === GameStates.PLAYER_WIN || state === GameStates.DEALER_LOST) {
                this.moneyManager.addMoney(this.currentBet * 2);
            }
            if (state === GameStates.DRAW) {
                this.moneyManager.addMoney(this.currentBet);
            }
            if (state === GameStates.PLAYER_LOST || state === GameStates.DEALER_WIN) {
                // TODO: Add dealer text to show - player lost
            }
            this.blackjackReplay.visible = true;
            setTimeout(() => {
                this.blackjackReplay.text = "";
                this.blackjackReplay.visible = false;
            }, 4000);
        }
    }

    showDealerHiddenCard() {
        const sprite = this.dealerHand.cardsImg[0];
        const startY = sprite.y;
        sprite.zIndex = 1;
        const downCardStart = () => {
            sprite.y += 2;
            if (sprite.y >= startY)
                removeDownCard();
        }
        const removeDownCard = () => {
            this.app.ticker.remove(downCardStart);
        }
        const upCardStart = () => {
            sprite.y -= 2;
            if (sprite.y <= startY - 40)
                removeUpCard();
        }
        const removeUpCard = async () => {
            this.app.ticker.remove(upCardStart);
            sprite.texture = PIXI.Texture.from(CardImages[parseCardToString(this.dealerHand.hand[0], false)]);
            this.app.ticker.add(downCardStart);
        }
        this.app.ticker.add(upCardStart);
    }

    getState(): GameStates {
        if (this.turn){
            if (this.playerHand.score > 21) {
                const aces = this.playerHand.hand.filter((card) => card.rank.abbrn === 'A').length;
                const minScore = this.playerHand.score - (aces * 10);
                if (minScore > 21) {
                    this.showDealerHiddenCard();
                    this.finished = true;
                    return GameStates.PLAYER_LOST;
                }
            }
            if (this.playerHand.countCards() === 5) {
                this.showDealerHiddenCard();
                this.finished = true;
                return GameStates.PLAYER_WIN;
            }
        }
        else {
            if (this.dealerHand.score > 21) {
                const aces = this.dealerHand.hand.filter((card) => card.rank.abbrn === 'A').length;
                const minScore = this.dealerHand.score - (aces * 10);
                if (minScore > 21) {
                    this.finished = true;
                    return GameStates.DEALER_LOST;
                }
                else if (this.dealerHand.countCards() === 5) {
                    this.finished = true;
                    return GameStates.DEALER_WIN;
                }
            }
            else {
                if (this.dealerHand.score > this.playerHand.score) {
                    this.finished = true;
                    return GameStates.DEALER_WIN;
                }
                if (this.dealerHand.score === this.playerHand.score && this.dealerHand.score > 15){
                    this.finished = true;
                    return GameStates.DRAW;
                }
            }
        }
        return GameStates.CONTINUE;
    }
}

export class BlackjackHand {
    blackjackStage: PIXI.Container<PIXI.ContainerChild>;
    isPlayer: boolean;
    hand: Card[];
    score: number;
    cardsImg: PIXI.Sprite[];
    scoreText: PIXI.Text;
    app: PIXI.Application;
    constructor(
        isPlayer: boolean, 
        blackjackStage: PIXI.Container<PIXI.ContainerChild>,
        scoreText: PIXI.Text,
        app: PIXI.Application,
    ) {
        this.blackjackStage = blackjackStage;
        this.hand = [];
        this.score = 0;
        this.isPlayer = isPlayer;
        this.cardsImg = [];
        this.scoreText = scoreText;
        this.app = app;
    }

    draw(cards: Card[]){
        cards.map((card) => {
            this.hand.push(card);
            this.score += CardValues[card.rank.abbrn];
            this.scoreText.text = `Score: `;
            if (this.score > 21) {
                let aces = this.hand.filter((card) => card.rank.abbrn === 'A').length;
                let bestScore = this.score;
                while (bestScore > 21 && aces > 0) {
                    bestScore -= 10;
                    aces--;
                }
                this.scoreText.text += `${bestScore}`;
            }
            else {
                this.scoreText.text += `${this.score}`;
            }
            const hidden = (this.isPlayer) ? false : this.countCards() === 1;
            const sprite = PIXI.Sprite.from(CardImages[parseCardToString(card, hidden)]);
            sprite.scale = 0.85;
            sprite.zIndex = 1;
            (Math.round(Math.random())) ? 
                    sprite.rotation += Math.random() / 20 : sprite.rotation -= Math.random() / 20;
            const offsetX = 60 * this.countCards() + Math.random() * 5;
            const offsetY = 100;
            if (!this.isPlayer) {
                sprite.x = this.app.screen.width / 1.75 + offsetX;
                sprite.y = this.app.screen.height / 4 + offsetY;
            }
            else {
                sprite.x = this.app.screen.width / 1.75 + offsetX;
                sprite.y = this.app.screen.height / 1.4 + offsetY;
            }
            this.blackjackStage.addChild(sprite);
            const fnTicker = () => {
                sprite.y -= 2;
                if (sprite.y <= ((this.isPlayer) ? this.app.screen.height / 1.4 : this.app.screen.height / 4))
                    removeTicker();
            }
            const removeTicker = () => {
                this.app.ticker.remove(fnTicker);
            }
            this.app.ticker.add(fnTicker);
            this.cardsImg.push(sprite);
        })
    }

    countCards(): number{
        return this.hand.length;
    }
}
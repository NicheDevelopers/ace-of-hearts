import * as PIXI from 'pixi.js';
import app from './app';

class MoneyManager {
    private balance: number;
    private balanceText: PIXI.Text;

    constructor(initialBalance: number) {
        this.balance = initialBalance;

        this.balanceText = new PIXI.Text({text: this.formatBalance()});
        this.balanceText.style.fill = "#FFFFFF";
        this.balanceText.style.fontSize = 48;

        this.balanceText.anchor.set(1, 0);
        this.balanceText.position.set(1850, 50);

        app.stage.addChild(this.balanceText);
    }

    private updateDisplay(): void {
        this.balanceText.text = this.formatBalance();
    }

    addMoney(amount: number): number {
        this.balance += amount;
        this.updateDisplay();
        return this.balance;
    }

    subtractMoney(amount: number): number {
        if (amount > this.balance) {
            throw new Error("Insufficient funds");
        }
        this.balance -= amount;
        this.updateDisplay();
        return this.balance;
    }

    formatBalance(currencySymbol: string = 'MKD'): string {
        return `${this.balance.toFixed(2)}${currencySymbol}`;
    }

    onResize(app: PIXI.Application): void {
        this.balanceText.position.set(app.screen.width - 10, 10);
    }
}

const moneyManager = new MoneyManager(1000);


export default moneyManager;
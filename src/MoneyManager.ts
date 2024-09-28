import * as PIXI from 'pixi.js';
import app from './app';

class MoneyManager {
    private balance: number;
    private balanceText: PIXI.Text;
    private moneyIcon: PIXI.Sprite | null = null;

    constructor(initialBalance: number) {
        this.balance = initialBalance;

        // Load the money icon
        PIXI.Assets.load('/money.png').then((texture) => {
            this.moneyIcon = new PIXI.Sprite(texture);
            this.moneyIcon.width = 48;  // Match the font size
            this.moneyIcon.height = 48;
            this.moneyIcon.anchor.set(1, 0.5); // Anchor to middle-right
            this.updatePositions();
            app.stage.addChild(this.moneyIcon);
            
            this.updateDisplay(); // Call this after icon is loaded to position text correctly
        });

        this.balanceText = new PIXI.Text(this.formatBalance());
        this.balanceText.style.fill = "#F6CE6B";
        this.balanceText.style.fontSize = 48;
        this.balanceText.anchor.set(1, 0.5); // Anchor to middle-right
        app.stage.addChild(this.balanceText);

        this.updateDisplay(); // Initial positioning of text
    }

    private updateDisplay(): void {
        this.balanceText.text = this.formatBalance();
        this.updatePositions();
    }

    private updatePositions(): void {
        const rightEdge = app.screen.width - 10; // 10 pixels from the right edge

        if (this.moneyIcon) {
            this.moneyIcon.position.set(rightEdge - 10, 50);
            
            // Position the text to the left of the icon
            this.balanceText.position.set(
                this.moneyIcon.x - this.moneyIcon.width - 20, // 10 pixels gap between icon and text
                this.moneyIcon.y
            );
        } else {
            // If icon isn't loaded yet, position text on the right
            this.balanceText.position.set(rightEdge, 50);
        }
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

    formatBalance(currencySymbol: string = ' MKD'): string {
        return `${this.balance.toFixed(2)}${currencySymbol}`;
    }

    onResize(): void {
        this.updatePositions();
    }
}

const moneyManager = new MoneyManager(1000);

export default moneyManager;
import * as PIXI from 'pixi.js';
import dziadu from '/dziadu.webp';

import app from './app';

type ButtonOptions = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  text?: string;
  onclick?: () => void;
};

class Button {
  constructor({x=0, y=0, width=150, height=50, text, onclick}: ButtonOptions) {
    // Load the button texture (image) - using the latest API
    const texture = PIXI.Texture.from(dziadu);

    // Create the button sprite
    const button = new PIXI.Sprite(texture);

    const [buttonWidth, buttonHeight] = [width, height];
    const [buttonX, buttonY] = [
      app.renderer.width / 2 - buttonWidth / 2,
      app.renderer.height / 2 - buttonHeight / 2,
    ];

    // Set the button's position and size
    button.x = buttonX;
    button.y = buttonY;
    button.width = buttonWidth;
    button.height = buttonHeight;

    const mask = new PIXI.Graphics();
    mask.fill(0xffffff);
    mask.roundRect(button.x, button.y, width, height, 15); // Rounded rectangle with 15px corner radius
    mask.fill();

    // Apply the mask to the button sprite
    button.mask = mask;

    // Make the button interactive
    button.interactive = true;
    //button.buttonMode = true; // Show hand cursor on hover

    // Add click/tap event
    button.on('pointerdown', () => {
      console.log("Button clicked!");
    });

    // Add the button to the stage
    app.stage.addChild(button);

    // Save the original Y position of the button for resetting later
    const originalY = button.y;
    const hoverOffset = 5;  // How much the button should rise on hover
    const depressOffset = 10;  // How much the button should depress on click

    // Function to reset button to its normal position
    function resetButtonPosition() {
      button.y = originalY; // Reset the button to its original position
      buttonText.y = button.y + button.height / 2; // Reset text position
    }

    // On hover (pointerover): Move the button up by hoverOffset
    button.on('pointerover', () => {
      button.y = originalY - hoverOffset; // Move the button up
      mask.y = originalY - 50;
      buttonText.y = button.y + button.height / 2; // Adjust the text position accordingly
    });

    // On hover out (pointerout): Reset to original position
    button.on('pointerout', () => {
      resetButtonPosition(); // Reset button position and text position
    });

    // On click (pointerdown): Move the button down by depressOffset for depress effect
    button.on('pointerdown', () => {
      button.y = originalY + depressOffset; // Move the button down for the depress effect
      buttonText.y = button.y + button.height / 2; // Adjust the text position accordingly
      onclick?.();
    });

    // On release (pointerup or pointerupoutside): Reset to normal position
    button.on('pointerup', () => {
      resetButtonPosition(); // Reset button to normal state after click
    });
    button.on('pointerupoutside', () => {
      resetButtonPosition(); // Reset even if mouse leaves the button after click
    });

    // Add text label on top of the sprite
    const buttonText = new PIXI.Text({ text: text ?? "" });
    buttonText.anchor.set(0.5); // Center the text
    buttonText.x = button.x + button.width / 2;
    buttonText.y = button.y + button.height / 2;
    app.stage.addChild(buttonText);
  }
}

export default Button;
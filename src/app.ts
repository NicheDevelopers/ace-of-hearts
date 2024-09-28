import * as PIXI from 'pixi.js';

const app = new PIXI.Application();
await app.init({ width: 1920, height: 1080 });

document.body.appendChild(app.canvas);

export default app;
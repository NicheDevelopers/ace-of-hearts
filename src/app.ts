import * as PIXI from 'pixi.js';

async function getApp() {
  const app = new PIXI.Application();
  await app.init({ width: 1920, height: 1080 });

  document.body.appendChild(app.canvas);

  return app;
}

export default getApp;
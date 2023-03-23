import { Application, BlurFilter } from "pixi.js";
import { Bool } from "./bool";
import keyboard from "./keyboard";
import Vector2 from "./vector";

const appViewportRatio = new Vector2(3.0, 4.0);
const scale = 200;
export const appWidth = scale * appViewportRatio.x;
export const appHeight = scale * appViewportRatio.y;

export const appPause = new Bool(true);

const app = new Application({
  width: appWidth,
  height: appHeight,
  backgroundColor: '#011036',
  autoStart: true
});

const root = document.getElementById('app');

if (root) {
  root.appendChild(app.view);
}

appPause.subscribe('disable', () => {
  app.stage.filters.pop();
});

appPause.subscribe('enable', () => {
  app.stage.filters = [new BlurFilter(20)]
});


if (appPause.value) {
  app.stage.filters = [new BlurFilter(20)]
}

export function play() {
  appPause.from(app).disable();
}

app.ticker.add(function() {
  if (keyboard.isKeyReleased('Escape')) {
    appPause.from(app).enable();
  }
  if (keyboard.isKeyDown('Enter') && appPause.value) {
    play();
  }
});

export default app;

import { Application } from "pixi.js";
import Menu from "../ui/menu";
import { resume } from "./game";
import keyboard from "./keyboard";

export const appWidth = 500;
export const appHeight = 800;

export let paused = true;

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

export function pause() {
  paused = true;
}

export function play() {
  paused = false;
}

const menu = new Menu();

menu.addItem('menu-item-resume');

app.ticker.add(function() {
  if (keyboard.isKeyDown('Escape') && !paused) {
    console.log('pause');
    pause();
    menu.open();
  }
});

export { menu };
export default app;

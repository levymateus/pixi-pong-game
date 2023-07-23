import { Application, BlurFilter } from "pixi.js";
import State from "./state";

export default class App extends Application {
  constructor() {
    super({
      width: 3 * 2 * 100,
      height: 4 * 2 * 100,
      backgroundColor: '#011036',
      autoStart: false
    });
    const self = this;
    const root = document.getElementById('app');
    if (root) {
      root.appendChild(this.view);
    }
    this.pause = new State('pause', true);

    const blur = new BlurFilter(20);
    self.stage.filters = [blur];

    this.pause.subscribe(function(paused) {
      if (!paused) {
        self.stage.filters = [];
      } else {
        self.stage.filters = [blur];
      }
    });
  }

  running() {
    return this.pause.equal(false);
  }
}
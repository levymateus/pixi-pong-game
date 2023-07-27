import { Application, BlurFilter } from "pixi.js";
import Store from "./store";

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
    this.store = new Store();

    const blur = new BlurFilter(20);
    self.stage.filters = [blur];

    this.store.subscribe('pause', function(paused) {
      if (!paused) {
        self.stage.filters = [];
      } else {
        self.stage.filters = [blur];
      }
    });
    this.store.set('pause', true, this);
  }

  running() {
    return !this.store.get('pause');
  }
}

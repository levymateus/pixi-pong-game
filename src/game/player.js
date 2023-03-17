import { appWidth } from "./app";
import Keyboard from "./keyboard";
import Platform from "./platform";
import Score from "./score";

export default class Player extends Platform {
  constructor(x, y) {
    super({ id: 'player', x, y, width: 120, height: 30, color: '#3443eb' });
    this._name = 'unknown';
    this.speed.x = 3.5;
    this.speed.y = 0.0;
    this.score = new Score(this._name);
  }

  set name(name) {
    this._name = name;
    this.score = new Score(name);
  }

  update(delta) {
    if (Keyboard.isKeyDown('KeyD', 'ArrowRight') && this.x + this.width / 2 <= appWidth) {
      this.move(this.speed.x * delta, 0);
    }

    if (Keyboard.isKeyDown('KeyA', 'ArrowLeft') && this.x - this.width / 2 >= 0) {
      this.move(this.speed.x * delta * -1, 0);
    }

  }
}

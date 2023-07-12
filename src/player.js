import Game from "./main";
import Paddle from "./paddle";
import { sound } from "@pixi/sound";

export default class Player extends Paddle {
  constructor(x, y) {
    super({ id: "player", x, y, width: 120, height: 30, color: "#3443eb" });
    this._name = "unknown";
    this.speed.x = 3.5;
    this.speed.y = 0.0;
  }

  update(delta) {
    if (
      (Game.keyboard.isKeyDown("KeyD", "ArrowRight") || Game.gamepad.isPressed("RT")) &&
      this.x + this.width / 2 <= Game.app.view.width
    ) {
      this.move(this.speed.x * delta, 0);
    }

    if (
      (Game.keyboard.isKeyDown("KeyA", "ArrowLeft") || Game.gamepad.isPressed("LT")) &&
      this.x - this.width / 2 >= 0
    ) {
      this.move(this.speed.x * delta * -1, 0);
    }
  }

  reset() {
    this.x = Game.app.view.width / 2;
  }

  onCollide() {
    Game.score.increment(1);
    this.speed.x += 0.01;
    this.speed.y += 0.01;
    sound.play("hanging");
    Game.gamepad.vibrate("dual-rumble", {
      startDelay: 0,
      duration: 200,
      weakMagnitude: 0.1,
      strongMagnitude: 0.5,
    });
  }
}

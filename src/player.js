import Main from "./main";
import Paddle from "./paddle";
import { sound } from "@pixi/sound";
import Vector2 from "./vector";
import Input from "./Input";

export default class Player extends Paddle {

  static MAX_VELOCITY = new Vector2(8.0, 0);
  static FRICTION_VEC = new Vector2(0.23, 0);

  constructor(x, y) {
    super({ id: "player", x, y, width: 120, height: 30, color: "#3443eb" });
    this._name = "unknown";
    this.speed.x = 3.0;
    this.velocity = new Vector2(0, 0);
    this.direction = new Vector2(0, 0);
  }

  update(delta) {
    const isPlayerMoveRight = Input.isKeyDown('player_move_right');
    const isPlayerMoveLeft = Input.isKeyDown('player_move_left');
    const isKeyDown = isPlayerMoveRight || isPlayerMoveLeft;
    const isRightBound = this.x + this.width / 2 >= Main.app.view.width;
    const isLeftBound = this.x - this.width / 2 <= 0;

    if (isRightBound || isLeftBound) {
      this.velocity.x = 0;
    }

    if (isPlayerMoveRight && !isRightBound && this.velocity.x <= Player.MAX_VELOCITY.x) {
      this.direction.x = 1.0;
      this.velocity.x = 0.0;
      this.velocity.x += this.speed.x * this.direction.x;
    }

    if (isPlayerMoveLeft && !isLeftBound && this.velocity.x >= -Player.MAX_VELOCITY.x) {
      this.direction.x = -1.0;
      this.velocity.x = 0.0;
      this.velocity.x += this.speed.x * this.direction.x;
    }

    if (!isKeyDown && this.direction.x > 0 && this.velocity.x >= 0.1) {
      this.velocity.x -= Player.FRICTION_VEC.x;
    }

    if (!isKeyDown && this.direction.x < 0 && this.velocity.x <= -0.1) {
      this.velocity.x += Player.FRICTION_VEC.x;
    }

    const globalSpeed = Main.app.store.get('speed');
    this.move(this.velocity.x * globalSpeed.x * delta, 0);
  }

  reset() {
    this.x = Main.app.view.width / 2;
  }

  onCollide(collisor) {
    Main.score.increment(1000);
    sound.play("hanging");
    Input.controllerVibrate("dual-rumble", {
      startDelay: 0,
      duration: 200,
      weakMagnitude: 0.1,
      strongMagnitude: 0.5,
    });
    collisor.explode();
    const globalSpeed = Main.app.store.get('speed');
    const step = Math.sqrt(Main.score.value) / 10000;
    const speed = new Vector2(globalSpeed.x + step, globalSpeed.y + step);
    this.speed.x += step;
    this.speed.y += step;
    Main.app.store.set('speed', speed);
  }
}

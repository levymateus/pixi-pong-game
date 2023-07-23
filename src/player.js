import Game from "./main";
import Paddle from "./paddle";
import { sound } from "@pixi/sound";
import Vector2 from "./vector";
import Input from "./Input";

export default class Player extends Paddle {
  
  static MAX_VELOCITY = new Vector2(8.0, 0);
  static FRICTION_VEC = new Vector2(0.08, 0);

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
    const isRightBound = this.x + this.width / 2 >= Game.app.view.width;
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

    this.move(this.velocity.x * delta, 0);
  }

  reset() {
    this.x = Game.app.view.width / 2;
  }

  onCollide(collisor) {
    Game.score.increment(1);
    this.speed.x += 0.01;
    this.speed.y += 0.01;
    sound.play("hanging");
    Input.controllerVibrate("dual-rumble", {
      startDelay: 0,
      duration: 200,
      weakMagnitude: 0.1,
      strongMagnitude: 0.5,
    });
    collisor.explode();
  }
}

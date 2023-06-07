import { Circle, Graphics } from "pixi.js";
import { random } from "./utils";
import Vector2 from "./vector";
import Game from "./main";

class Pong extends Circle {
  constructor({ id, x, y, speed = new Vector2(0, 0), radius = 20, color = '#ffff' }) {
    super(x, y, radius);
    this.id = id;
    this.position = new Vector2(x, y);
    this.speed = speed;
    this.gr = new Graphics();
    this.color = color;
    this.energy = 0.8;
    this.visible = true;
    this.collides = null;
    this.value = 5;
    Game.app.stage.addChild(this.gr);
  }

  move(x, y) {
    this.x += x;
    this.y += y;
    this.position.x = this.x;
    this.position.y = this.y;
  }

  draw() {
    this.gr.beginFill(this.color);
    this.gr.drawCircle(
      this.x,
      this.y,
      this.radius
    );
    this.gr.endFill();
  }

  render() {
    this.gr.clear();
    if (this.visible) {
      this.draw();
    }
  }

  update(delta) {
    this.move(this.speed.x * delta, this.speed.y * delta);
  }

  onCollide() {
    this.speed.y = this.speed.y * -1;
    this.speed.x = random(-3, 3);
  }
}

export default Pong;

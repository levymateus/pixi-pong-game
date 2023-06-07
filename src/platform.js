import { Graphics, Rectangle } from "pixi.js";
import Vector2 from "./vector";
import Game from "./main";

export default class Platform extends Rectangle {
  constructor({ id, x, y, width, height, color = '#fff' }) {
    super(x, y, width, height);
    this.id = id;
    this.gr = new Graphics();
    this.speed = new Vector2(0, 0);
    this.color = color;
    this.visible = true;
    Game.app.stage.addChild(this.gr);
  }

  move(x, y) {
    this.x += x;
    this.y += y;
  }

  draw() {
    this.gr.beginFill(this.color);
    this.gr.drawRect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height,
    );
    this.gr.endFill()
  }

  render() {
    this.gr.clear();
    if (this.visible) {
      this.draw();
    }
  }
}

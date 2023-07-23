import { Circle, Graphics } from "pixi.js";
import { random } from "./utils";
import Vector2 from "./vector";
import Game from "./main";
import Emmiter from "./emmiter";
import { sound } from "@pixi/sound";
import texture from "../assets/particle.png";

class Pong extends Circle {
  constructor({ id, x, y, speed = new Vector2(0, 0), radius = 20, color = '#ffff' }) {
    super(x, y, radius);
    this.id = id;
    this.position = new Vector2(x, y);
    this.speed = speed;
    this.gr = new Graphics();
    this.color = color;
    this.visible = true;
    this.collides = null;
    this.value = 5;
    this.emmiter = new Emmiter({ 
      count: 3,
      name: this.id,
      texture: texture,
      speed: 8,
      gravity: 0.09,
      friction: 0.98,
    });
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

  explode() {
    this.emmiter.createExplosion(this.x, this.y);
  }

  onCollide(collision) {
    if (collision.id !== 'bounds') {
      this.speed.y = this.speed.y * -1;
      this.speed.x = random(-3, 3);
    }
    sound.play("hanging");
    this.explode();
  }
}

export default Pong;

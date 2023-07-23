import { Container, Sprite, Assets } from "pixi.js";
import Sys from "./systems";
import Game from "./main";

export default class Emmiter {
  constructor({ name, count, texture, speed, gravity, friction }) {
    this.name = name;
    this.count = count;
    this.speed = speed;
    this.gravity = gravity;
    this.friction = friction;
    this.texture = Assets.load(texture);
    const container = new Container();
    container.name = this.name;
    Game.app.stage.addChild(container);
    Sys.registerEmmiter(this);
  }
  
  async createExplosion(x, y) {
    const emmiter = this;
    const container = Game.app.stage.getChildByName(this.name);
    const texture = await this.texture;

    function createParticle() {
      const sprite = new Sprite(texture);
      sprite.anchor.set(0.5);
      sprite.x = x; 
      sprite.y = y;
      sprite.vx = (Math.random() - 0.5) * emmiter.speed;
      sprite.vy = (Math.random() - 0.5) * emmiter.speed;
      sprite.alpha = 1;
  
      sprite.update = function() {
        sprite.vx *= emmiter.friction;
        sprite.vy *= emmiter.friction;
        sprite.vy += emmiter.gravity;
        sprite.x += sprite.vx; 
        sprite.y += sprite.vy;
        sprite.alpha -= 0.05;
  
        if (sprite.alpha <= 0) {
          container.removeChild(sprite);
        }
      }

      return sprite;
    }
   
    for (let i = 0; i < emmiter.count; i++) {
      container.addChild(createParticle());
    }
    
  }
}

import Platform from "./platform";
import { sound } from "@pixi/sound";
import Game from "./main";

export default class NPCPlayer extends Platform {
  constructor(x, y) {
    super({ id: 'npcplayer', x, y, width: 120, height: 30, color: '#FF0000' });
    this.speed.x = 2.0;
    this.speed.y = 1;
  }

  update() {
   
  }

  onCollide() {
    sound.play("hanging");
  }
}

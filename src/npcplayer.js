import Paddle from "./paddle";
import { sound } from "@pixi/sound";

export default class NPCPlayer extends Paddle {
  constructor(x, y) {
    super({ id: "npcplayer", x, y, width: 120, height: 30, color: "#FF0000" });
    this.speed.x = 2.0;
    this.speed.y = 1;
  }

  update() {}

  onCollide() {
    sound.play("hanging");
  }
}

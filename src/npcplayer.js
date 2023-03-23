import Platform from "./platform";

export default class NPCPlayer extends Platform {
  constructor(x, y) {
    super({ id: 'npcplayer', x, y, width: 120, height: 30, color: '#FF0000' });
    this.speed.x = 2.0;
    this.speed.y = 1;
  }

  update() {
    // code...
  }
}

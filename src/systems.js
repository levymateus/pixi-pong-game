import Main from "./main";
import intersects from "./intersects";
import Bounds from "./bounds";
import Vector2 from "./vector";

class CollisionSystem {
  constructor() {
    this.lastCollision = null;
  }

  execute() {
    const bounds = new Bounds()
    const circle = Main.scene.find('pong');
    const players = Main.scene.query('player', 'npcplayer');

    players.forEach((player) => {
      const isCollide = intersects(circle, player);
      if (isCollide && this.lastCollision != player) {
        circle.onCollide(player);
        player.onCollide(circle);
        this.lastCollision = player;
      }
    });

    if (circle.x >= Main.app.view.width) {
      circle.onCollide(bounds);
      this.lastCollision = bounds;
    }

    if (circle.x <= 0) {
      circle.onCollide(bounds);
      this.lastCollision = bounds;
    }
  }
}

class PongSystem {
  constructor() {}

  gameover() {
    const player = Main.scene.find('player');
    player.reset();
    Main.score.reset();
    Main.app.store.set('speed', new Vector2(1, 1), PongSystem);
    Main.app.store.set('lifes', 3, PongSystem);
    Main.app.store.set('pause', true, PongSystem);
  }

  execute() {
    const circle = Main.scene.find('pong');
    const lifes = Main.app.store.get('lifes');

    if (circle.y >= Main.app.view.height || circle.y <= 0) {

      Main.app.store.set('lifes', lifes - 1);

      if (Main.app.store.get('lifes') <= 0) {
        return this.gameover();
      }

      if (Main.score.value - Main.score.value * 0.1 <= 0) {
        return this.gameover();
      } else {
        Main.score.increment(-Main.score.value * 0.1);
      }

      circle.resetAfter(3);
    }

    if (circle.x >= Main.app.view.width) {
      circle.speed.x = 3.0 * -1;
    }

    if (circle.x <= 0) {
      circle.speed.x = 4.0 * 1;
    }
  }
}

class Player2System {
  constructor() { }

  execute() {
    const player = Main.scene.find('npcplayer');
    const circle = Main.scene.find('pong');

    if (circle.y >= Main.app.view.height || circle.y <= 0) {
      circle.x = Main.app.view.width / 2;
      circle.y = Main.app.view.height / 2;
    }

    if (circle.x + player.width / 2 <= Main.app.view.width && circle.x - player.width / 2 >= 0) {
      player.x = circle.x;
    }
  }
}

class ParticlesSystem {
  constructor() {
    this.emmiters = [];
  }

  execute() {
    const container = this.emmiters.map(emmiter => Main.app.stage.getChildByName(emmiter.name));
    const children = container.reduce((prev, curr) => [...prev, ...curr.children], []);
    children.forEach((particle) => {
      particle.update();
    });
  }
}

class Systems {
  static systems = [CollisionSystem, PongSystem, Player2System, ParticlesSystem]

  static registerEmmiter(emmiter) {
    const sys = Systems.systems.find((s) => s instanceof ParticlesSystem);
    sys.emmiters.push(emmiter);
  }

  static init() {
    Systems.systems.forEach((System, i) => {
      Systems.systems[i] = new System();
    });
  }

  static execute(delta) {
    Systems.systems.forEach((sys) => sys.execute(delta));
  }
}

export default Systems;

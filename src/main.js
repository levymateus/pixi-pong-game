import { Application, BlurFilter } from "pixi.js";
import KeyboardInput from "./keyboard";
import GamepadInput from "./gamepad";
import NPCPlayer from "./npcplayer";
import Player from "./player";
import Pong from "./pong";
import Sys from "./systems";
import State from "./state";
import Vector2 from "./vector";
import Score from "./score";

class Scene {
  constructor() {
    this.children = [];
  }

  append(node) {
    this.children.push(node);
  }

  find(id) {
    return this.children.find(node => node.id === id);
  }

  query(...id) {
    return this.children.filter(node => id.filter(i => node.id === i).length);
  }

  render(delta) {
    this.children.forEach((node) => {
      if (Game.app.running()) {
        node.update(delta);
      }
      node.render(delta);
    });
  }
}

class App extends Application {
  constructor() {
    super({
      width: 3 * 2 * 100,
      height: 4 * 2 * 100,
      backgroundColor: '#011036',
      autoStart: false
    });
    const self = this;
    const root = document.getElementById('app');
    if (root) {
      root.appendChild(this.view);
    }
    this.pause = new State('pause', true);
    self.stage.filters = [new BlurFilter(20)];

    this.pause.subscribe(function(data) {
      if (!data) {
        self.stage.filters = [];
      } else {
        self.stage.filters = [new BlurFilter(20)];
      }
    });
  }

  running() {
    return this.pause.equal(false);
  }
}

class Game {

  static app = new App();
  static scene = new Scene();
  static keyboard = KeyboardInput;
  static gamepad = GamepadInput;
  static systems = Sys;
  static score = new Score(0);

  constructor() {
    if (this instanceof Game) {
      throw Error('A static class cannot be instantiated.');
    }
  }

  static play() {

    Game.scene.append(new Player(Game.app.view.width / 2, Game.app.view.height - 30));
    Game.scene.append(new NPCPlayer(Game.app.view.width / 2, 60));
    Game.scene.append(new Pong({
      id: 'pong',
      x: Game.app.view.width / 2,
      y: Game.app.view.height / 2,
      radius: 8,
      speed: new Vector2(0.0, 3.0),
      color: '#ebe834',
    }));

    Game.systems.init();
    Game.gamepad.scan();

    Game.app.ticker.add(function(delta) {
      Game.scene.render(delta);
    });

    Game.app.ticker.add(function() {
      Game.keyboard.update();
      Game.gamepad.update();
      if (Game.keyboard.isKeyDown('Escape') || Game.gamepad.isPressed('options2')) {
        Game.app.pause.setState(true);
      }
      if (Game.keyboard.isKeyDown('Enter') || Game.gamepad.isPressed('A')) {
        Game.app.pause.setState(false);
      }
    });

    Game.app.ticker.add(function(delta) {
      if (Game.app.running()) {
        Game.systems.execute(delta);
      }
    });

    Game.app.start();
  }

  static stop() {
    Game.app.ticker.remove(Game.scene.render);
  }

  static pause() {
    Game.app.pause.setState(true);
  }
}

export default Game;

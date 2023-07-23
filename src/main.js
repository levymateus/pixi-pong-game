import Keyboard from "./keyboard";
import Controller from "./gamepad";
import NPCPlayer from "./npcplayer";
import Player from "./player";
import Pong from "./pong";
import Sys from "./systems";
import Vector2 from "./vector";
import Score from "./score";
import Input from "./Input";
import Scene from "./scene";
import App from "./app";

class Game {

  static app = new App();
  static scene = new Scene();
  static score = new Score(0);

  static play() {

    Sys.init();
    Controller.scan();
    
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
    
    Game.app.ticker.add(function(delta) {
      Game.scene.render(delta);
    });

    Game.app.ticker.add(function() {
      Keyboard.update();
      Controller.update();
      
      if (Input.isKeyDown('pause')) {
        Game.app.pause.setState(true);
      }
      
      if (Input.isKeyDown('resume')) {
        Game.app.pause.setState(false);
      }
    });

    Game.app.ticker.add(function(delta) {
      if (Game.app.running()) {
        Sys.execute(delta);
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

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

class Main {

  static app = new App();
  static scene = new Scene();
  static score = new Score(0);

  static init() {
    Main.app.store.setState('speed', new Vector2(1, 1));
    Main.app.store.setState('lifes', 3);
  }

  static play() {

    Sys.init();
    Controller.scan();
    
    Main.scene.append(new Player(Main.app.view.width / 2, Main.app.view.height - 30));
    Main.scene.append(new NPCPlayer(Main.app.view.width / 2, 60));
    Main.scene.append(new Pong({
      id: 'pong',
      x: Main.app.view.width / 2,
      y: Main.app.view.height / 2,
      radius: 8,
      speed: new Vector2(0.0, 3.0),
      color: '#ebe834',
    }));
    
    Main.app.ticker.add(function(delta) {
      Main.scene.render(delta);
    });

    Main.app.ticker.add(function() {
      Keyboard.update();
      Controller.update();
      
      if (Input.isKeyDown('pause')) {
        Main.app.store.setState('pause', true, Main);
      }
      
      if (Input.isKeyDown('resume')) {
        Main.app.store.setState('pause', false, Main);
      }
    });

    Main.app.ticker.add(function(delta) {
      if (Main.app.running()) {
        Sys.execute(delta);
      }
    });

    Main.app.start();
  }

  static stop() {
    Main.app.ticker.remove(Main.scene.render);
  }

  static pause() {
    Main.app.store.setState('pause', true, Main);
  }
}

export default Main;

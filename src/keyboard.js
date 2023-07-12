import Events from 'nom-events'
import Game from './main';

class Keyboard {
	constructor() {
		this.keyStates = new Map();
    this.events = new Events();
	}

  clear() {
    this.keyStates.clear();
  }

  update() {
    this.keyStates.forEach((value, keyCode) => {
      const event = this.keyStates.get(keyCode);

      event.alreadyPressed = true;

      if (event.wasReleased) {
        this.keyStates.delete(keyCode);
      }

      keyboard.events.call('down', keyCode, event);
      keyboard.events.call('down_' + keyCode, keyCode, event);
    });
  }

  isKeyDown(...args) {
    let result = false;
    for(let keyCode of args) {
      const event = this.keyStates.get(keyCode);
      if (event && !event.wasReleased)
        result = true;
    }

    return result;
  }

  isKeyUp(...args) {
    return !this.isKeyDown(args);
  }

  isKeyPressed(...args) {
    let result = false;

    if (args.length == 0)
      return false;

    for(let keyCode of args) {
      const event = this.keyStates.get(keyCode);
      if (event && !event.wasReleased && !event.alreadyPressed)
        result = true;
    }

    return result;
  }

  isKeyReleased(...args) {
    let result = false;

    if (args.length == 0)
      return false;

    for(let keyCode of args) {
      const event = this.keyStates.get(keyCode);
      if (event && event.wasReleased)
        result = true;
    }

    return result;
  }
}

const keyboard = new Keyboard();

window.addEventListener(
  "keydown", (event) => {
    // disable gamepad when the keyboard is active.
    Game.gamepad.settings.active = false;
    if (!keyboard.keyStates.get(event.code)) {
      keyboard.keyStates.set(event.code, event);
      keyboard.events.call('pressed', event.code, event);
      keyboard.events.call('pressed_' + event.code, event.code, event);
    }
  }, false
);

  window.addEventListener(
    "keyup", (event) => {
    event = keyboard.keyStates.get(event.code);
    if (event) {
      event.wasReleased = true;
      keyboard.events.call('released', event.code, event);
      keyboard.events.call('released_' + event.code, event.code, event);
    }
  }, false
);

export default keyboard

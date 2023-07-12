const haveEvents = "ongamepadconnected" in window;

class Gamepad {
  constructor() {
    this.gamepad = null;
    window.addEventListener("gamepadconnected", this.onConnect);
  }

  onConnect(conn) {
    this.gamepad = conn.gamepad;
    window.requestAnimationFrame(() => this.update());
  }

  update() {
    if (haveEvents) {
      this.scan();
    }

    if (!this.gamepad) {
      return;
    }

    this.gamepad.buttons.forEach((button) => {
      const isPressed = button === 1.0;
      if (isPressed) {
        console.log("button is pressed");
      }
    });

    window.requestAnimationFrame(() => this.update());
  }

  scan() {
    console.log("scan gamepads");
  }
}

const gamepad = new Gamepad();

export default gamepad;

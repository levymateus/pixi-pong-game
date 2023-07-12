export default class XboxController {
    static map = [
      "A",
      "B",
      "X",
      "Y",
      "LB",
      "RB",
      "LT",
      "RT",
      "options1",
      "options2",
      "R3",
      "L3",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "share",
      "",
      "",
      "",
      ""
    ]

    constructor() {
      this.gamepad = null;
      this.scan();
      if (!this.gamepad) {
        throw new Error('No Xbox gamepad is connected!')
      }
    }

    isPressed(name) {
      return this.get(name)?.pressed || false;
    }

    getValue(name) {
      return this.get(name)?.value || 0.0;
    }

    /**
     * @returns the `GamepadButton` object.
     */
    get(name) {
      const xboxCtrlIndex = XboxController.map.findIndex((xboxBtnName) => xboxBtnName === name);
      return this.gamepad.buttons.find((btn, index) => index === xboxCtrlIndex);
    }

    /**
     * @returns the gamepad id.
     */
    get id() {
      return this.gamepad.id;
    }

    // refresh the gamepad status
    scan() {
      const gamepads = navigator.getGamepads();
      for (const gamepad of gamepads) {
        if (gamepad && gamepad.id.toLocaleLowerCase().includes('xbox')) {
          this.gamepad = gamepad;
          return;
        }
      }
    }

    vibrate(effect, options) {
      this.gamepad.vibrationActuator.playEffect(effect, options)
    }
}

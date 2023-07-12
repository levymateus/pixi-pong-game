import Log from "./log";
import XboxController from "./xbox-controller";

class GamepadInput {
  
  static XBOX_GAMEPAD_KEY = 'xbox'
  
  static controllers = new Map();

  static settings = { vibration: true, active: false };
  
  static scan() {
    function connect() {
      GamepadInput.settings.active = true;
      GamepadInput.controllers.set(GamepadInput.XBOX_GAMEPAD_KEY, new XboxController());
      Log.info(GamepadInput.controllers.get(GamepadInput.XBOX_GAMEPAD_KEY) ? 'Xbox gamepad is connected' : '');
    }
    window.addEventListener("gamepadconnected", connect);
  }

  // to update all button states.
  static update() {
    const xbox = GamepadInput.controllers.get(GamepadInput.XBOX_GAMEPAD_KEY);
    if (!GamepadInput.settings.active) {
      // check the gamepad activity testing if any buttons is pressed.
      GamepadInput.settings.active = XboxController.map.some((key) => xbox?.isPressed(key));
    }
    GamepadInput.controllers.get(GamepadInput.XBOX_GAMEPAD_KEY)?.scan();
  }

  static isPressed(...keys) {
    const xbox = GamepadInput.controllers.get(GamepadInput.XBOX_GAMEPAD_KEY);
    return keys.some((key) => xbox?.isPressed(key));
  }

  static vibrate(effect, options) {
    const xbox = GamepadInput.controllers.get(GamepadInput.XBOX_GAMEPAD_KEY);
    try {
      if (GamepadInput.settings.active && GamepadInput.settings.vibration) {
        xbox?.vibrate(effect, options);
      }
    } catch (error) {
      Log.info(error.message);
    }
  }
}

export default GamepadInput;

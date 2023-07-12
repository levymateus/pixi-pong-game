import Log from "./log";
import XboxController from "./xbox-controller";

class GamepadInput {
  
  static XBOX_GAMEPAD_KEY = 'xbox'
  
  static controllers = new Map();
  
  static scan() {
    function connect() {
      GamepadInput.controllers.set(GamepadInput.XBOX_GAMEPAD_KEY, new XboxController());
      Log.info(GamepadInput.controllers.get(GamepadInput.XBOX_GAMEPAD_KEY) ? 'Xbox gamepad is connected' : '');
    }
    window.addEventListener("gamepadconnected", connect);
  }

  static update() {
    GamepadInput.controllers.get(GamepadInput.XBOX_GAMEPAD_KEY)?.scan();
  }

  static isPressed(...keys) {
    const xbox = GamepadInput.controllers.get(GamepadInput.XBOX_GAMEPAD_KEY);
    if (xbox) return keys.some((key) => xbox.isPressed(key));
    return false;
  }
}

export default GamepadInput;

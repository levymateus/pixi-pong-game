import keyboard from "./keyboard";
import Settings from "./settings";
import Controller from "./gamepad";

export default class Input {
  static isKeyDown(label) {
    const [key, altKey] = Settings.keyboard[label];
    const controllerKey = Settings.gamepad[label];
    return keyboard.isKeyDown(key, altKey) || Controller.isPressed(controllerKey);
  }
  static controllerVibrate(effect, options) {
    Controller.vibrate(effect, options);
  }
}

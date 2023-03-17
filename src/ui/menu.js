import { play } from "../game/app";
import { resume } from "../game/game";
import UI from "./ui";

export default class Menu extends UI {
  constructor() {
    super();
    this.items = [];
    this.isOpen = false;
  }

  addItem(name) {
    const el = document.getElementById(name);
    if (el) {
      el.addEventListener('click', (evt) => {
        evt.preventDefault();
        this.close();
        resume();
        play();
      });
    }
  }

  open() {
    this.isOpen = true;
    const el = document.getElementById('menu');
    const ui = document.getElementById('ui');
    if (el && ui) {
      el.classList.remove('hidden');
      ui.classList.add('backdrop');
    }
  }

  close() {
    this.isOpen = false;
    const el = document.getElementById('menu');
    const ui = document.getElementById('ui');
    if (el && ui) {
      el.classList.add('hidden');
      ui.classList.remove('backdrop');
    }
  }

}

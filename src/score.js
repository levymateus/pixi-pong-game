import PubSub from "./pubsub";

export default class Score extends PubSub {
  constructor(value) {
    super();
    this.value = value;
    if (!localStorage.getItem('pixi-pong-best-score')) {
      localStorage.setItem('pixi-pong-best-score', this.value);
    }
  }

  increment(value) {
    this.value += value || 1;
    if (this.value > this.getBestScore()) {
      localStorage.setItem('pixi-pong-best-score', this.value);
    }
    this.notify('increment', this.value, this.notifier);
  }

  reset() {
    this.value = 0;
    this.notify('reset', 0, this.notifier);
  }

  getBestScore() {
    return parseInt(localStorage.getItem('pixi-pong-best-score')) || 0;
  }
}

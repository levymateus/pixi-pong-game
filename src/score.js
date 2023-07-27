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
    this.value += parseInt(value);
    this.notify('increment', this.value, this.notifier);
  }
  
  reset() {
    if (this.value > this.getBestScore()) {
      localStorage.setItem('pixi-pong-best-score', this.value);
    }
    this.value = 0;
    this.notify('reset', 0, this.notifier);
  }

  getBestScore() {
    return parseInt(localStorage.getItem('pixi-pong-best-score')) || 0;
  }
}

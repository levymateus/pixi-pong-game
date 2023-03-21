import PubSub from "./lib/pubsub";

export class Bool extends PubSub {
  constructor(value) {
    super();
    this.value = value;
  }

  enable() {
    this.value = true;
    this.notify('enable', true, this.notifier);
  }

  disable() {
    this.value = false;
    this.notify('disable', false, this.notifier);
  }
}

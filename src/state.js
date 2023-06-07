import PubSub from "./pubsub";

class State extends PubSub {
  constructor(type, initialValue) {
    super();
    this.type = type;
    this._value = initialValue;
  }

  equal(value) {
    return this._value === value;
  }

  setState(value) {
    this._value = value;
    this.notify(this.type, this._value, this.notifier);
  }

  subscribe(listener) {
    super.subscribe(this.type, listener);
  }

  unsubscribe(listener) {
    super.unsubscribe(this.type, listener);
  }
}

export default State;

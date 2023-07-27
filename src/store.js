import PubSub from "./pubsub";

class Store extends PubSub {
  constructor() {
    super();
    this.store = new Map();
  }

  set(key, value, notifier) {
    const v = typeof value === 'function' ? value(this.getState(key)) : value;
    this.store.set(key, v);
    this.notify(key, value, notifier || this);
  }
  
  get(key) {
    return this.store.get(key);
  }

  subscribe(key, listener) {
    super.subscribe(key, listener);
  }

  unsubscribe(key, listener) {
    super.unsubscribe(key, listener);
  }
}

export default Store;

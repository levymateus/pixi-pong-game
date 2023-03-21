
export class PubSub {
  constructor () {
    this.listeners = new Map();
    this.notifier = null;
  }

  from(notifier) {
    this.notifier = notifier;
    return this;
  }

  subscribe (type, observer) {
    if (this.listeners.get(type)) {
      if (this.listeners.get) this.listeners.get(type)?.push(observer)
    } else {
      this.listeners.set(type, [])
      this.listeners.get(type)?.push(observer)
    }
  }

  unsubscribe (type, observer) {
    const listeners = this.listeners.get(type)
    if (listeners) {
      this.listeners.set(
        type,
        listeners.filter((item) => item !== observer)
      )
    }
  }

  notify (type, data, notifier) {
    const listeners = this.listeners.get(type)
    if (listeners) {
      listeners.forEach((fn) => fn(data, notifier))
    }
  }
}

export default PubSub

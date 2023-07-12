const isDev = true

class Log {
  static info(...args) {
    if (isDev) {
      console.log(...args);
    }
  }
}

export default Log;

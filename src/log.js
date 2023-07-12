const isDev = () => localStorage.getItem('dev') ? true : false;

class Log {
  static info(...args) {
    if (isDev()) {
      console.log(...args);
    }
  }
}

export default Log;

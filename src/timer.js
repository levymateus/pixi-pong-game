export default class Timer {
  static countdown(count, callback, complete) {
    let countdown = count;
    let intervalId = null;
    callback && callback(countdown);
    intervalId = setInterval(() => {
      countdown -= 1;
      if (countdown > 0) {
        callback && callback(countdown);
      } else {
        clearInterval(intervalId);
        complete();
      }
    }, 1000);
  }
}

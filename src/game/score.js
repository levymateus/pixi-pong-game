import UI from "../ui/ui";

class Score extends UI {
  constructor(name) {
    super();
    this.count = 0;
    this._storeKey = name;
    this.stored = localStorage.getItem(this._storeKey);

    if (!this.stored) {
      localStorage.setItem(this._storeKey, this.count);
    }

    this.updateBestScore();
  }

  render() {
    const el = document.getElementById('score-value');
    if (el) {
      el.innerText = this.count;
    }
  }

  add(value) {
    this.count += value;
  }

  sub(value) {
    this.count -= value;
  }

  reset() {
    this.count = 0;
  }

  updateBestScore() {
    const value = localStorage.getItem(this._storeKey);
    const bestScoreEl = document.getElementById('best-score-value');
    if (bestScoreEl) {
      bestScoreEl.innerText = value;
    }
    this.render();
  }

  save() {
    const value = localStorage.getItem(this._storeKey);
    if (this.count > value) {
      localStorage.setItem(this._storeKey, this.count);
    }
    this.updateBestScore();
  }
}

export default Score;

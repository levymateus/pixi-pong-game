import { css, html, LitElement } from 'lit';
import Main from "./main";
import { classMap } from 'lit/directives/class-map.js';

export class UIScore extends LitElement {
  static properties = {};

  static styles = css`
    :host {
      display: flex;
      justify-content: space-between;
      padding: 8px 16px;
    }

    .hidden {
      visibility: hidden;
    }
  `;

  constructor() {
    super();
    this.value = 0;
    this.bestScore = Main.score.getBestScore();
    this.classes = { hidden: false };
    this.handleScoreIncrement = value => {
      this.value = value;
      if (this.value) {
        this.classes.hidden = false;
      }
      this.requestUpdate();
    }
    this.handleScoreReset = () => {
      this.value = 0;
      this.bestScore = Main.score.getBestScore();
      this.requestUpdate();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    Main.score.subscribe('increment', this.handleScoreIncrement);
    Main.score.subscribe('reset', this.handleScoreReset);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    Main.score.unsubscribe('increment', this.handleScoreIncrement);
    Main.score.unsubscribe('reset', this.handleScoreReset);
  }

  render() {
    return html`
      <div class=${classMap(this.classes)}>score: ${this.value}</div>
      <div>best score: ${this.bestScore}</div>
    `;
  }
}

if(!customElements.get('ui-score')) {
  customElements.define('ui-score', UIScore);
}

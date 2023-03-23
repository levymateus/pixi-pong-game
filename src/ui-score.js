import { css, html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { score } from './game';

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
    this.bestScore = score.getBestScore();
    this.classes = { hidden: true };
    this.handleScoreIncrement = value => {
      this.value = value;
      if (this.value) {
        this.classes.hidden = false;
      }
      this.bestScore = score.getBestScore();
      this.requestUpdate();
    }
    this.handleScoreReset = () => {
      this.value = 0;
      this.requestUpdate();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    score.subscribe('increment', this.handleScoreIncrement);
    score.subscribe('reset', this.handleScoreReset);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    score.unsubscribe('increment', this.handleScoreIncrement);
    score.unsubscribe('reset', this.handleScoreReset);
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

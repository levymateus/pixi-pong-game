import { css, html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import Main from "./main";

export class UIHealth extends LitElement {
  static properties = {};

  static styles = css`
    :host {
      display: flex;
      justify-content: flex-end;
      padding: 8px 16px;
    }

    .hidden {
      visibility: hidden;
    }
  `;

  constructor() {
    super();
    this.value = 3;
    this.classes = { hidden: false };
    this.setValue = (value) => {
      this.value = parseInt(value);
      this.requestUpdate();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    Main.app.store.subscribe('lifes', this.setValue);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  render() {
    return html`
      <div class=${classMap(this.classes)}>x${this.value}</div>
    `;
  }
}

if(!customElements.get('ui-health')) {
  customElements.define('ui-health', UIHealth);
}

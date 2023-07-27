import "./ui-tobar";
import "./ui-score";
import "./ui-main-menu";
import "./ui-health";

import { LitElement, css, html } from 'lit';

export class UI extends LitElement {
  static properties = {};

  static styles = css`
    :host {
      z-index: 10;
      position: absolute;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
    }
  `;

  constructor() {
    super();
  }

  render() {
    return html`
      <ui-topbar></ui-topbar>
      <ui-main-menu></ui-main-menu>
    `;
  }
}

if (!customElements.get('app-ui')) {
  customElements.define('app-ui', UI);
}

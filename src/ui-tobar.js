import { LitElement, css, html } from 'lit';

export class UITopbar extends LitElement {
  static properties = {};

  static styles = css`
    :host {
      
    }
  `;

  constructor() {
    super();
  }

  render() {
    return html`
      <header>
        <ui-score></ui-score>
      </header>
    `;
  }
}

if (!customElements.get('ui-topbar')) {
  customElements.define('ui-topbar', UITopbar);
}

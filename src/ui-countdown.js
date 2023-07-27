import { LitElement, css, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import Main from "./main";

export class UICountdown extends LitElement {
  static properties = {
    items: {},
  };

  static styles = css`
    :host {
      position: absolute;
      top: 50%;
      left: 50%;
    }

    h1 {
      font-size: 48px;
    }

    .open {
      visibility: visible;
    }

    .closed {
      visibility: hidden;
    }
  `;

  constructor() {
    super();
    this.classes = { open: true, closed: false };
    this.countdown = Main.app.store.get('countdown');
    this.onCountdownChange = (countdown) => {
      this.countdown = countdown;
      this.classes.open = !!this.countdown;
      this.classes.closed = !this.countdown;
      this.requestUpdate();
    }
  }

  connectedCallback(){
    super.connectedCallback();
    Main.app.store.subscribe('countdown', this.onCountdownChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    Main.app.store.unsubscribe('countdown', this.onCountdownChange);
  }

  open() {
    this.classes.open = true;
    this.classes.closed = !this.classes.open;
    this.requestUpdate();
  }

  close() {
    this.classes.open = false;
    this.classes.closed = !this.classes.open;
    this.requestUpdate();
  }

  render() {
    return html`
      <div class=${classMap(this.classes)}>
        <h1>${this.countdown}</h1>
      </div>
    `;
  }
}

if (!customElements.get('ui-countdown')) {
  customElements.define('ui-countdown', UICountdown);
}

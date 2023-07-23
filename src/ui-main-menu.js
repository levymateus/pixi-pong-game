import { LitElement, css, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import Main from "./main";

export class UIMainMenu extends LitElement {
  static properties = {
    items: {},
  };

  static styles = css`
    :host {
      visibility: hidden;
      height: 100%;
    }

    :host ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .open {
      visibility: visible;
    }

    .closed {
      visibility: hidden;
    }

    .flex-col {
      flex-direction: column;
    }

    .flex-container {
      height: 100%;
      padding: 0;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .flex-item {
      color: white;
      text-align: center;
    }

    :host button {
      width: 100%;
      padding: 0;
      margin: 0;
      background-color: transparent;
      border: 0;
      color: white;
      font-size: 20px;
      text-align: center;
    }

    :host button:hover {
      font-weight: bold;
      cursor: pointer;
    }
  `;

  constructor() {
    super();
    this.classes = { open: true, closed: false };
    this.items = [
      html`<li>
        <button type="button" @click="${this.close}">resume</button>
      </li>`,
    ];
  }

  connectedCallback(){
    super.connectedCallback();
    this.handleClose = (pause, notifier) => {
      if (pause) {
        this.open();
      } else {
        this.classes.open = false;
        this.classes.closed = !this.classes.open;
        this.requestUpdate();
      }
    };
    Main.app.pause.subscribe(this.handleClose);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    Main.app.pause.unsubscribe(this.handleClose);
  }

  open() {
    this.classes.open = true;
    this.classes.closed = !this.classes.open;
    this.requestUpdate();
  }

  close() {
    this.classes.open = false;
    this.classes.closed = !this.classes.open;
    Main.app.pause.from(this).setState(false);
    this.requestUpdate();
  }

  render() {
    return html`
      <div class=${classMap(this.classes)}>
        <div class="flex-container flex-row flex-col">
          <h1 class="flex-item">PixiPong</h1>
          <ul class="flex-item">
            ${this.items.map((item) => item)}
          </ul>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('ui-main-menu')) {
  customElements.define('ui-main-menu', UIMainMenu);
}

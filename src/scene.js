import Main from "./main";

export default class Scene {
  constructor() {
    this.children = [];
  }

  append(node) {
    this.children.push(node);
  }

  find(id) {
    return this.children.find(node => node.id === id);
  }

  query(...id) {
    return this.children.filter(node => id.filter(i => node.id === i).length);
  }

  render(delta) {
    this.children.forEach((node) => {
      if (Main.app.running()) {
        node.update(delta);
      }
      node.render(delta);
    });
  }
}
  
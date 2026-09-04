export default class BaseComponent {
  #root;

  constructor(root) {
    this.#root = root;
  }

  get root() {
    return this.#root;
  }

  child(selector) {
    return `${this.#root} ${selector}`;
  }
}

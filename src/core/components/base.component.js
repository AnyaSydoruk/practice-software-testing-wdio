/**
 * Abstract page fragment.
 *
 * A component owns a root selector and builds its children relative to it,
 * so the same markup can appear on several pages without selector clashes.
 */
export default class BaseComponent {
  #root;

  /** @param {string} root selector of the component's root element */
  constructor(root) {
    this.#root = root;
  }

  get root() {
    return this.#root;
  }

  /**
   * Builds a selector scoped to this component.
   * @param {string} selector
   * @returns {string}
   */
  child(selector) {
    return `${this.#root} ${selector}`;
  }
}

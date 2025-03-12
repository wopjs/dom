/**
 * Creates an instance of the element for the specified tag.
 */
export const createElement = /* @__PURE__ */ document.createElement.bind(document);

/**
 * Creates an instance of the element for the specified tag.
 */
export { createElement as element };

/**
 * Creates an instance of a svg element.
 */
export const createSvgElement = /* @__PURE__ */ document.createElementNS.bind(document, "http://www.w3.org/2000/svg");

/**
 * Creates an instance of a svg element.
 */
export { createSvgElement as svgElement };

/**
 * Sets or removes element's attribute
 */
export function attr(el: Element, name: string, value?: string | null | undefined) {
  if (value == null) {
    el.removeAttribute(name);
  } else if (el.getAttribute(name) !== value) {
    el.setAttribute(name, value);
  }
}

/**
 * Inserts nodes after the last child of node, while replacing strings in nodes with equivalent Text nodes.
 *
 * Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.
 */
export function append<T extends Node>(el: Element, node: T): T;
export function append<T extends Node>(el: Element, ...nodes: (T | string)[]): void;
export function append<T extends Node>(el: Element, ...nodes: (T | string)[]): T | undefined {
  el.append(...nodes);
  if (nodes.length === 1 && typeof nodes[0] !== "string") return nodes[0] as T;
}

/**
 * Inserts nodes before the first child of node, while replacing strings in nodes with equivalent Text nodes.
 *
 * Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.
 */
export function prepend(el: Element, ...nodes: (Node | string)[]): void {
  el.prepend(...nodes);
}

/**
 * Returns the first element that is a descendant of node that matches selectors.
 */
export function querySelector<K extends keyof HTMLElementTagNameMap>(
  selectors: K,
  parentNode?: ParentNode,
): HTMLElementTagNameMap[K] | null;
export function querySelector<K extends keyof SVGElementTagNameMap>(
  selectors: K,
  parentNode?: ParentNode,
): SVGElementTagNameMap[K] | null;
export function querySelector<E extends Element = Element>(selectors: string, parentNode?: ParentNode): E | null;
export function querySelector<E extends Element = Element>(
  selectors: string,
  parentNode: ParentNode = document,
): E | null {
  return parentNode.querySelector(selectors);
}

/**
 * Returns all element descendants of node that match selectors.
 */
export function querySelectorAll<K extends keyof HTMLElementTagNameMap>(
  selectors: K,
  parentNode?: ParentNode,
): NodeListOf<HTMLElementTagNameMap[K]>;
export function querySelectorAll<K extends keyof SVGElementTagNameMap>(
  selectors: K,
  parentNode?: ParentNode,
): NodeListOf<SVGElementTagNameMap[K]>;
export function querySelectorAll<E extends Element = Element>(
  selectors: string,
  parentNode?: ParentNode,
): NodeListOf<E>;
export function querySelectorAll<E extends Element = Element>(
  selectors: string,
  parentNode: ParentNode = document,
): NodeListOf<E> {
  return parentNode.querySelectorAll(selectors);
}

/**
 * If force is not given, "toggles" token, removing it if it's present and adding it if it's not present. If force is true, adds token (same as add()). If force is false, removes token (same as remove()).
 *
 * Returns true if token is now present, and false otherwise.
 *
 * Throws a "SyntaxError" DOMException if token is empty.
 *
 * Throws an "InvalidCharacterError" DOMException if token contains any spaces.
 */
export function toggleClassName(el: Element, token: string, force?: boolean): boolean {
  return el.classList.toggle(token, force);
}

/**
 * Returns the first (starting at element) inclusive ancestor that matches selectors, and null otherwise.
 *
 * Throws a "SyntaxError" if the selector is invalid.
 */
export function closest<K extends keyof HTMLElementTagNameMap>(
  el: EventTarget | null,
  selector: K,
): HTMLElementTagNameMap[K] | null;
export function closest<K extends keyof SVGElementTagNameMap>(
  el: EventTarget | null,
  selector: K,
): SVGElementTagNameMap[K] | null;
export function closest<E extends Element = Element>(el: EventTarget | null, selector: string): E | null;
export function closest<E extends Element = Element>(el: EventTarget | null, selector: string): E | null {
  return el && ((el as Partial<Element>).closest?.(selector) || null);
}

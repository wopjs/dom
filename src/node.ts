export function isHTMLElement(node: unknown): node is HTMLElement {
  return typeof node === "object" && (node as Node | null)?.nodeType === Node.ELEMENT_NODE;
}

export function isTextNode(node: unknown): node is Text {
  return typeof node === "object" && (node as Node | null)?.nodeType === Node.TEXT_NODE;
}

/**
 * Creates a text string from the specified value.
 * @param data String that specifies the nodeValue property of the text node.
 */
export const createTextNode = /* @__PURE__ */ document.createTextNode.bind(document);

export function insertBefore<T extends Node>(target: Node, node: T, anchor?: Node): T {
  return target.insertBefore(node, anchor || null);
}

export { insertBefore as insert };

export function appendChild<T extends Node>(target: Node, child: T): T {
  return target.appendChild(child);
}

export function removeChild<T extends Node>(target: Node, child: T): T {
  return target.removeChild(child);
}

export function replaceChild<T extends Node>(target: Node, node: Node, child: T): T {
  return target.replaceChild(node, child);
}

/**
 * Returns a copy of node. If deep is true, the copy also includes the node's descendants.
 */
export function cloneNode<T extends Node>(node: T, deep?: boolean): T {
  return node.cloneNode(deep) as T;
}

/**
 * Returns true if other is an inclusive descendant of node, and false otherwise.
 */
export function contains(node: Node, other: Node | null): boolean {
  return node.contains(other);
}

export function detach<T extends Node>(node: T): T {
  node.parentNode?.removeChild(node);
  return node;
}

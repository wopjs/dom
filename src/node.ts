export function isHTMLElement(node?: Node | null): node is HTMLElement {
  return node?.nodeType === Node.ELEMENT_NODE;
}

export function isTextNode(node?: Node | null): node is Text {
  return node?.nodeType === Node.TEXT_NODE;
}

export function insert<T extends Node>(target: Node, node: T, anchor?: Node): T {
  return target.insertBefore(node, anchor || null);
}

export function detach<T extends Node>(node: T): T {
  node.parentNode?.removeChild(node);
  return node;
}

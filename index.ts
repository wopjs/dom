export function element<K extends keyof HTMLElementTagNameMap>(tag: K): HTMLElementTagNameMap[K];
export function element(tag: string): HTMLElement;
export function element(tag: string) {
  return document.createElement(tag);
}

export function attr(node: Element, name: string, value?: string | null | undefined) {
  if (value == null) {
    node.removeAttribute(name);
  } else if (node.getAttribute(name) !== value) {
    node.setAttribute(name, value);
  }
}

export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attributes?: Record<string, string>,
  ...children: Array<string | Node>
) {
  const el = element(tag);
  for (const key in attributes) {
    el.setAttribute(key, attributes[key]);
  }
  el.append(...children);
  return el;
}

export function insert(target: Node, node: Node, anchor?: Node) {
  target.insertBefore(node, anchor || null);
}

export function detach(node: Node) {
  return node.parentNode?.removeChild(node);
}

export function listen<K extends keyof WindowEventMap>(
  el: Window,
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => unknown,
  options?: boolean | AddEventListenerOptions
): () => void;
export function listen<K extends keyof DocumentEventMap>(
  el: Document,
  type: K,
  listener: (this: Document, ev: DocumentEventMap[K]) => unknown,
  options?: boolean | AddEventListenerOptions
): () => void;
export function listen<K extends keyof HTMLElementEventMap>(
  el: HTMLElement,
  type: K,
  listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown,
  options?: boolean | AddEventListenerOptions
): () => void;
export function listen<K extends keyof MediaQueryListEventMap>(
  el: MediaQueryList,
  type: K,
  listener: (this: HTMLElement, ev: MediaQueryListEventMap[K]) => unknown,
  options?: boolean | AddEventListenerOptions
): () => void;
export function listen(
  el: HTMLElement | Window | Document | MediaQueryList,
  type: string,
  listener: (this: HTMLElement | Window | Document, ev: Event) => unknown,
  options?: boolean | AddEventListenerOptions
): () => void {
  el.addEventListener(type, listener, options);
  return () => el.removeEventListener(type, listener, options);
}

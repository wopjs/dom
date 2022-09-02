interface CreateElement {
  <K extends keyof HTMLElementTagNameMap>(
    tagName: K,
    options?: ElementCreationOptions
  ): HTMLElementTagNameMap[K];
  (tagName: string, options?: ElementCreationOptions): HTMLElement;
}

export const element: CreateElement = document.createElement.bind(document);

export function attr(el: Element, name: string, value?: string | null | undefined) {
  if (value == null) {
    el.removeAttribute(name);
  } else if (el.getAttribute(name) !== value) {
    el.setAttribute(name, value);
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

export function addEventListener<K extends keyof WindowEventMap>(
  target: Window,
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => unknown,
  options?: boolean | AddEventListenerOptions,
): () => void;
export function addEventListener<K extends keyof DocumentEventMap>(
  target: Document,
  type: K,
  listener: (this: Document, ev: DocumentEventMap[K]) => unknown,
  options?: boolean | AddEventListenerOptions,
): () => void;
export function addEventListener<K extends keyof HTMLElementEventMap>(
  target: HTMLElement,
  type: K,
  listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown,
  options?: boolean | AddEventListenerOptions,
): () => void;
export function addEventListener<K extends keyof MediaQueryListEventMap>(
  target: MediaQueryList,
  type: K,
  listener: (this: HTMLElement, ev: MediaQueryListEventMap[K]) => unknown,
  options?: boolean | AddEventListenerOptions,
): () => void;
export function addEventListener(
  target: HTMLElement | Window | Document | MediaQueryList,
  type: string,
  listener: (this: HTMLElement | Window | Document, ev: Event) => unknown,
  options?: boolean | AddEventListenerOptions,
): () => void {
  target.addEventListener(type, listener, options);
  return () => target.removeEventListener(type, listener, options);
}

export { addEventListener as listen };

export interface EventLike {
  preventDefault(): void;
  stopPropagation(): void;
}

export function stopPropagation(ev: EventLike): void {
  ev.stopPropagation();
}

export function stopEvent(ev: EventLike, cancelBubble?: boolean): void {
  ev.preventDefault();
  if (cancelBubble) {
    ev.stopPropagation();
  }
}

export interface EventLikeConstructor<E extends Event> {
  new (type: string, options: EventInit): E;
}

/**
 * Simulate an event, ensures the `target` property is correct.
 *
 * ```js
 * dispatchEvent(window, KeyboardEvent, "keydown", { key: "Enter" });
 * ```
 */
export function dispatchEvent<E extends Event>(
  target: EventTarget,
  Ctor: EventLikeConstructor<E>,
  type: string,
  init?: EventInit & Partial<E>,
): void {
  const event = new Ctor(type, { bubbles: true, cancelable: true, ...init });
  Object.defineProperty(event, "target", { get: () => target });
  target.dispatchEvent(event);
}

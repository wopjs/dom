export function listen<K extends keyof WindowEventMap>(
  target: Window,
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => unknown,
  options?: boolean | AddEventListenerOptions
): () => void;
export function listen<K extends keyof DocumentEventMap>(
  target: Document,
  type: K,
  listener: (this: Document, ev: DocumentEventMap[K]) => unknown,
  options?: boolean | AddEventListenerOptions
): () => void;
export function listen<K extends keyof HTMLElementEventMap>(
  target: HTMLElement,
  type: K,
  listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown,
  options?: boolean | AddEventListenerOptions
): () => void;
export function listen<K extends keyof MediaQueryListEventMap>(
  target: MediaQueryList,
  type: K,
  listener: (this: HTMLElement, ev: MediaQueryListEventMap[K]) => unknown,
  options?: boolean | AddEventListenerOptions
): () => void;
export function listen(
  target: HTMLElement | Window | Document | MediaQueryList,
  type: string,
  listener: (this: HTMLElement | Window | Document, ev: Event) => unknown,
  options?: boolean | AddEventListenerOptions
): () => void {
  target.addEventListener(type, listener, options);
  return () => target.removeEventListener(type, listener, options);
}

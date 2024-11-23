/* eslint-disable @typescript-eslint/no-explicit-any */

import { isHTMLElement } from "./node";

/**
 * Creates an instance of the element for the specified tag.
 */
export const createElement = /* @__PURE__ */ document.createElement.bind(document);

/**
 * Creates an instance of the element for the specified tag.
 */
export const element = createElement;

/**
 * Creates an instance of a svg element.
 */
export const createSvgElement = /* @__PURE__ */ document.createElementNS.bind(document, "http://www.w3.org/2000/svg");

/**
 * Creates an instance of a svg element.
 */
export const svgElement = createSvgElement;

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

type HTMLElementAttributeKeys<T> = Partial<{
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? never
    : T[K] extends object
      ? HTMLElementAttributeKeys<T[K]>
      : T[K];
}>;
type ElementAttributes<T> = HTMLElementAttributeKeys<T> & Record<string, any>;
type RemoveHTMLElement<T> = T extends HTMLElement ? never : T;
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
type ArrayToObj<T extends readonly any[]> = UnionToIntersection<RemoveHTMLElement<T[number]>>;
type HHTMLElementTagNameMap = HTMLElementTagNameMap & { "": HTMLDivElement };

type TagToElement<T> = T extends `${infer TStart}#${string}`
  ? TStart extends keyof HHTMLElementTagNameMap
    ? HHTMLElementTagNameMap[TStart]
    : HTMLElement
  : T extends `${infer TStart}.${string}`
    ? TStart extends keyof HHTMLElementTagNameMap
      ? HHTMLElementTagNameMap[TStart]
      : HTMLElement
    : T extends keyof HTMLElementTagNameMap
      ? HTMLElementTagNameMap[T]
      : HTMLElement;

type TagToElementAndId<TTag> = TTag extends `${infer TTag}@${infer TId}`
  ? { element: TagToElement<TTag>; id: TId }
  : { element: TagToElement<TTag>; id: "root" };

type TagToRecord<TTag> =
  TagToElementAndId<TTag> extends { element: infer TElement; id: infer TId }
    ? Record<(TId extends string ? TId : never) | "root", TElement>
    : never;

type Child = HTMLElement | string | Record<string, HTMLElement>;

const H_REGEX = /(?<tag>[\w-]+)?(?:#(?<id>[\w-]+))?(?<class>(?:\.(?:[\w-]+))*)(?:@(?<name>(?:[\w_])+))?/;

function camelCaseToHyphenCase(str: string) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * A helper function to create nested dom nodes.
 * Taken from VS Code's source code.
 *
 * ```ts
 * const elements = h('div.code-view', [
 * 	h('div.title@title'),
 * 	h('div.container', [
 * 		h('div.gutter@gutterDiv'),
 * 		h('div@editor'),
 * 	]),
 * ]);
 * const editor = createEditor(elements.editor);
 * ```
 */
export function h<TTag extends string>(
  tag: TTag,
): TagToRecord<TTag> extends infer Y ? { [TKey in keyof Y]: Y[TKey] } : never;

export function h<TTag extends string, T extends Child[]>(
  tag: TTag,
  children: [...T],
): ArrayToObj<T> & TagToRecord<TTag> extends infer Y ? { [TKey in keyof Y]: Y[TKey] } : never;

export function h<TTag extends string>(
  tag: TTag,
  attributes: Partial<ElementAttributes<TagToElement<TTag>>>,
): TagToRecord<TTag> extends infer Y ? { [TKey in keyof Y]: Y[TKey] } : never;

export function h<TTag extends string, T extends Child[]>(
  tag: TTag,
  attributes: Partial<ElementAttributes<TagToElement<TTag>>>,
  children: [...T],
): ArrayToObj<T> & TagToRecord<TTag> extends infer Y ? { [TKey in keyof Y]: Y[TKey] } : never;

export function h(
  tag: string,
  ...args:
    | []
    | [attributes: ({ $: string } & Partial<ElementAttributes<HTMLElement>>) | Record<string, any>, children?: any[]]
    | [children: any[]]
): Record<string, HTMLElement> {
  let attributes: { $?: string } & Partial<ElementAttributes<HTMLElement>>;
  let children: (Record<string, HTMLElement> | HTMLElement)[] | undefined;

  if (Array.isArray(args[0])) {
    attributes = {};
    children = args[0];
  } else {
    attributes = (args[0] as any) || {};
    children = args[1];
  }

  const match = H_REGEX.exec(tag);

  if (!match || !match.groups) {
    throw new Error("Bad use of h");
  }

  const tagName = match.groups["tag"] || "div";
  const el = document.createElement(tagName);

  if (match.groups["id"]) {
    el.id = match.groups["id"];
  }

  const classNames = [];
  if (match.groups["class"]) {
    for (const className of match.groups["class"].split(".")) {
      if (className !== "") {
        classNames.push(className);
      }
    }
  }
  if (attributes.className !== undefined) {
    for (const className of attributes.className.split(".")) {
      if (className !== "") {
        classNames.push(className);
      }
    }
  }
  if (classNames.length > 0) {
    el.className = classNames.join(" ");
  }

  const result: Record<string, HTMLElement> = {};

  if (match.groups["name"]) {
    result[match.groups["name"]] = el;
  }

  if (children) {
    for (const c of children) {
      if (isHTMLElement(c)) {
        el.appendChild(c);
      } else if (typeof c === "string") {
        el.append(c);
      } else if ("root" in c) {
        Object.assign(result, c);
        el.appendChild(c.root);
      }
    }
  }

  for (const [key, value] of Object.entries(attributes)) {
    if (key === "className") {
      continue;
    } else if (key === "style") {
      for (const [cssKey, cssValue] of Object.entries(value)) {
        el.style.setProperty(
          camelCaseToHyphenCase(cssKey),
          typeof cssValue === "number" ? cssValue + "px" : "" + cssValue,
        );
      }
    } else if (key === "tabIndex") {
      el.tabIndex = value;
    } else {
      el.setAttribute(camelCaseToHyphenCase(key), value.toString());
    }
  }

  result["root"] = el;

  return result;
}

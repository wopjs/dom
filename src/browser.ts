function nav() {
  return typeof navigator != "undefined" ? navigator : { platform: "" };
}

export function isMac() {
  return /Mac/.test(nav().platform);
}

export function isWindows() {
  return /Win/.test(nav().platform);
}

export function isLinux() {
  return /Linux|X11/.test(nav().platform);
}

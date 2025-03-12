import { defineConfig } from "tsup";

import mangleCache from "./mangle-cache.json";

const minify = Boolean(process.env.MINIFY);

export default defineConfig({
  clean: true,
  dts: true,
  entry: ["src/index.ts"],
  esbuildOptions: options => {
    options.sourcesContent = false;
    options.mangleProps = /[^_]_$/;
    options.mangleCache = mangleCache;
  },
  format: ["cjs", "esm"],
  minify,
  sourcemap: !minify,
  splitting: false,
  target: "esnext",
  treeshake: true,
});

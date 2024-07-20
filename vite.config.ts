import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

import * as pkg from "./package.json";

const NODE_ENV = process.argv.mode || "development";
const VERSION = pkg.version;

export default defineConfig({
  /* shared */
  define: {
    NODE_ENV: JSON.stringify(NODE_ENV),
    VERSION: JSON.stringify(VERSION),
  },
  plugins: [cssInjectedByJsPlugin(), dts({ outDir: "dist/types" })],

  /* build */
  build: {
    outDir: "./dist",
    emptyOutDir: true,
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "src", "/index.ts"),
      name: "Paragraph",
      fileName: "paragraph",
    },
    rollupOptions: {
      external: ["@vclmbv/dtls"],
      output: {
        globals: { "@vclmbv/dtls": "$" },
        dir: "./dist",
      },
      input: "src/index.ts",
    },
  },
});

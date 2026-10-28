import { defineConfig } from "vite";
import { readFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));

export default defineConfig({
  define: {
    __VERSION__: JSON.stringify(pkg.version),
  },
  build: {
    lib: {
      entry: "src/ians-custom-room-card.ts",
      formats: ["es"],
      fileName: () => "ians-custom-room-card.js",
    },
    minify: "terser",
    terserOptions: {
      format: { comments: false },
      compress: { passes: 2 },
    },
    target: "es2018",
    outDir: "dist",
  },
});

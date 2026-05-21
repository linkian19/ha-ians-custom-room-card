import { defineConfig } from "vite";

export default defineConfig({
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

import { resolve } from "path";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");

const pageData = {
  "/index.html": {
    title: "Főoldal",
    entry: "home",
  },
  "/post.html": {
    title: "Egyéni poszt vagy page nézet",
  },
  "/list-view.html": {
    title: "Lista nézet (kategória, tag, szerző)",
  },
};

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: resolve(root, "partials"),
      context(pagePath) {
        return pageData[pagePath];
      },
    }),
  ],
  root,
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        post: resolve(root, "post.html"),
        "list-view": resolve(root, "list-view.html"),
      },
    },
  },
});

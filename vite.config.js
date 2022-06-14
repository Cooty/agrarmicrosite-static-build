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
    entry: "post",
  },
  "/page-impresszum.html": {
    title: "Impresszum",
    entry: "post",
  },
  "/page-search.html": {
    title: "Keresés",
    entry: "post",
  },
  "/list-view.html": {
    title: "Lista nézet (kategória, tag, szerző)",
    entry: "list",
  },
  "/list-view-tudastar.html": {
    title: "Tudástár - Sajtóadatbázis",
    entry: "list",
  },
  "/list-view-tudastar-other.html": {
    title: "Tudástár - Egyéb oldalak",
    entry: "list",
  },
};

export default defineConfig({
  // In production the `base` has to be an absolute URL of the GitHub page, where we're deploying to
  // otherwise it will throw a 404 and the app won't start.
  // The BASE_URL should be set on the CI (see .github/workflows/main.yml)
  base: process.env.BASE_URL ? process.env.BASE_URL : "/",
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
        "list-view-tudastar": resolve(root, "list-view-tudastar.html"),
        "list-view-tudastar-other": resolve(
          root,
          "list-view-tudastar-other.html"
        ),
        "page-impresszum": resolve(root, "page-impresszum.html"),
        "page-search": resolve(root, "page-search.html"),
      },
    },
  },
});

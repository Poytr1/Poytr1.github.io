import { mkdir, copyFile, cp, rm } from "node:fs/promises";
await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
for (const file of [
  "index.html",
  "projects.html",
  "news.html",
  "articles.html",
  "styles.css",
  "site.js",
]) {
  await copyFile(file, `dist/${file}`);
}
await cp("assets", "dist/assets", { recursive: true });
await copyFile(".nojekyll", "dist/.nojekyll");
console.log("Built all four portfolio pages in dist/.");

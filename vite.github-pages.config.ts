import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const [owner = "", repository = ""] = (process.env.GITHUB_REPOSITORY ?? "").split("/");
const isUserSite = repository.toLocaleLowerCase() === `${owner.toLocaleLowerCase()}.github.io`;
const base = repository && !isUserSite ? `/${repository}/` : "/";

export default defineConfig({
  base,
  root: "github-pages",
  publicDir: "../public",
  plugins: [react()],
  build: {
    emptyOutDir: true,
    outDir: "../dist-pages",
  },
});

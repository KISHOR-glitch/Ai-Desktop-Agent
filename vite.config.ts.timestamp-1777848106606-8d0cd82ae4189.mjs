// vite.config.ts
import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "file:///C:/Users/kisho/OneDrive/Desktop/Atlas-proj/atlas/node_modules/vite/dist/node/index.js";
import tailwindcss from "file:///C:/Users/kisho/OneDrive/Desktop/Atlas-proj/atlas/node_modules/@tailwindcss/vite/dist/index.mjs";
import vue from "file:///C:/Users/kisho/OneDrive/Desktop/Atlas-proj/atlas/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import electron from "file:///C:/Users/kisho/OneDrive/Desktop/Atlas-proj/atlas/node_modules/vite-plugin-electron/dist/simple.mjs";
import vueJsx from "file:///C:/Users/kisho/OneDrive/Desktop/Atlas-proj/atlas/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";

// package.json
var package_default = {
  name: "atlas",
  description: "An AI-powered computer-use agent built with Electron.",
  type: "module",
  version: "0.2.3",
  license: "Apache-2.0",
  main: ".build/dist-electron/main/index.js",
  author: {
    name: "dortanes",
    url: "https://github.com/dortanes"
  },
  engines: {
    node: ">=20.0.0",
    yarn: ">=1.22.22"
  },
  repository: {
    type: "git",
    url: "git+https://github.com/dortanes/atlas.git"
  },
  os: [
    "win32",
    "darwin",
    "linux"
  ],
  cpu: [
    "x64",
    "arm64"
  ],
  debug: {
    env: {
      VITE_DEV_SERVER_URL: "http://127.0.0.1:3344/"
    }
  },
  scripts: {
    dev: "vite",
    build: "npm run lint && vite build && electron-builder",
    preview: "vite preview",
    lint: "eslint . --ext .vue,.js,.jsx,.ts,.tsx",
    "lint:fix": "eslint . --ext .vue,.js,.jsx,.ts,.tsx --fix"
  },
  dependencies: {
    "@elevenlabs/elevenlabs-js": "^2.38.1",
    "@google/genai": "^1.44.0",
    "@hurdlegroup/robotjs": "^0.12.3",
    "@tailwindcss/vite": "^4.1.12",
    "@trpc/client": "10.45.0",
    "@trpc/server": "10.45.0",
    "@vitejs/plugin-vue-jsx": "^5.0.1",
    cheerio: "^1.2.0",
    daisyui: "5",
    "electron-trpc": "0.7.1",
    openai: "^6.27.0",
    "screenshot-desktop": "^1.15.3",
    tailwindcss: "^4.1.12",
    "uiohook-napi": "^1.5.4",
    "vosk-browser": "^0.0.8",
    "vue3-emoji-picker": "^1.1.8",
    "yandex-alice-client": "^0.3.1",
    zod: "^4.1.1"
  },
  devDependencies: {
    "@eslint/js": "^9.34.0",
    "@types/screenshot-desktop": "^1.15.0",
    "@typescript-eslint/eslint-plugin": "^8.40.0",
    "@typescript-eslint/parser": "^8.40.0",
    "@vitejs/plugin-vue": "^5.0.4",
    "@vue/eslint-config-typescript": "^14.6.0",
    electron: "^29.4.6",
    "electron-builder": "^24.13.3",
    eslint: "^9.34.0",
    "eslint-config-prettier": "^10.1.8",
    "eslint-plugin-vue": "^10.4.0",
    globals: "^16.3.0",
    typescript: "^5.4.2",
    vite: "^5.1.5",
    "vite-plugin-electron": "^0.28.4",
    "vite-plugin-electron-renderer": "^0.14.5",
    vue: "^3.4.21",
    "vue-eslint-parser": "^10.2.0",
    "vue-tsc": "^2.0.6"
  },
  packageManager: "yarn@1.22.22",
  volta: {
    node: "20.19.4",
    yarn: "1.22.22"
  }
};

// vite.config.ts
var __vite_injected_original_dirname = "C:\\Users\\kisho\\OneDrive\\Desktop\\Atlas-proj\\atlas";
var vite_config_default = defineConfig(({ command }) => {
  fs.rmSync(".build/dist-electron", { recursive: true, force: true });
  const isServe = command === "serve";
  const isBuild = command === "build";
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG;
  return {
    build: {
      outDir: ".build/dist"
    },
    plugins: [
      tailwindcss(),
      vue(),
      vueJsx(),
      electron({
        main: {
          // Shortcut of `build.lib.entry`
          entry: "electron/main/index.ts",
          vite: {
            build: {
              sourcemap,
              minify: isBuild,
              outDir: ".build/dist-electron/main",
              rollupOptions: {
                external: Object.keys("dependencies" in package_default ? package_default.dependencies : {})
              }
            },
            plugins: [
              // Copy prompt .md templates to the build output
              {
                name: "copy-static-assets",
                closeBundle() {
                  const src = path.resolve(__vite_injected_original_dirname, "electron/main/services/intelligence/prompts");
                  const dest = path.resolve(__vite_injected_original_dirname, ".build/dist-electron/main/prompts");
                  if (fs.existsSync(src)) {
                    fs.cpSync(src, dest, { recursive: true });
                  }
                }
              }
            ],
            resolve: {
              alias: {
                "@electron": path.resolve(__vite_injected_original_dirname, "electron/main")
              }
            }
          }
        },
        preload: {
          input: "electron/preload/index.ts",
          vite: {
            build: {
              sourcemap: sourcemap ? "inline" : void 0,
              // #332
              minify: isBuild,
              outDir: ".build/dist-electron/preload",
              rollupOptions: {
                external: Object.keys("dependencies" in package_default ? package_default.dependencies : {})
              }
            },
            resolve: {
              alias: {
                "@electron": path.resolve(__vite_injected_original_dirname, "electron/main")
              }
            }
          }
        },
        renderer: {}
      })
    ],
    resolve: {
      alias: {
        "@api": path.resolve(__vite_injected_original_dirname, "electron/main/api"),
        "@": path.resolve(__vite_injected_original_dirname, "src")
      }
    },
    clearScreen: false
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxca2lzaG9cXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxBdGxhcy1wcm9qXFxcXGF0bGFzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxraXNob1xcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXEF0bGFzLXByb2pcXFxcYXRsYXNcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2tpc2hvL09uZURyaXZlL0Rlc2t0b3AvQXRsYXMtcHJvai9hdGxhcy92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCBmcyBmcm9tICdub2RlOmZzJ1xuaW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tICdAdGFpbHdpbmRjc3Mvdml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IGVsZWN0cm9uIGZyb20gJ3ZpdGUtcGx1Z2luLWVsZWN0cm9uL3NpbXBsZSdcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcbmltcG9ydCBwa2cgZnJvbSAnLi9wYWNrYWdlLmpzb24nXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCB9KSA9PiB7XG4gIGZzLnJtU3luYygnLmJ1aWxkL2Rpc3QtZWxlY3Ryb24nLCB7IHJlY3Vyc2l2ZTogdHJ1ZSwgZm9yY2U6IHRydWUgfSlcblxuICBjb25zdCBpc1NlcnZlID0gY29tbWFuZCA9PT0gJ3NlcnZlJ1xuICBjb25zdCBpc0J1aWxkID0gY29tbWFuZCA9PT0gJ2J1aWxkJ1xuICBjb25zdCBzb3VyY2VtYXAgPSBpc1NlcnZlIHx8ICEhcHJvY2Vzcy5lbnYuVlNDT0RFX0RFQlVHXG5cbiAgcmV0dXJuIHtcbiAgICBidWlsZDoge1xuICAgICAgb3V0RGlyOiAnLmJ1aWxkL2Rpc3QnLFxuICAgIH0sXG5cbiAgICBwbHVnaW5zOiBbXG4gICAgICB0YWlsd2luZGNzcygpLFxuICAgICAgdnVlKCksXG4gICAgICB2dWVKc3goKSxcbiAgICAgIGVsZWN0cm9uKHtcbiAgICAgICAgbWFpbjoge1xuICAgICAgICAgIC8vIFNob3J0Y3V0IG9mIGBidWlsZC5saWIuZW50cnlgXG4gICAgICAgICAgZW50cnk6ICdlbGVjdHJvbi9tYWluL2luZGV4LnRzJyxcbiAgICAgICAgICB2aXRlOiB7XG4gICAgICAgICAgICBidWlsZDoge1xuICAgICAgICAgICAgICBzb3VyY2VtYXAsXG4gICAgICAgICAgICAgIG1pbmlmeTogaXNCdWlsZCxcbiAgICAgICAgICAgICAgb3V0RGlyOiAnLmJ1aWxkL2Rpc3QtZWxlY3Ryb24vbWFpbicsXG4gICAgICAgICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICBleHRlcm5hbDogT2JqZWN0LmtleXMoJ2RlcGVuZGVuY2llcycgaW4gcGtnID8gcGtnLmRlcGVuZGVuY2llcyA6IHt9KSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgICAgIC8vIENvcHkgcHJvbXB0IC5tZCB0ZW1wbGF0ZXMgdG8gdGhlIGJ1aWxkIG91dHB1dFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdjb3B5LXN0YXRpYy1hc3NldHMnLFxuICAgICAgICAgICAgICAgIGNsb3NlQnVuZGxlKCkge1xuICAgICAgICAgICAgICAgICAgLy8gQ29weSBwcm9tcHQgLm1kIHRlbXBsYXRlc1xuICAgICAgICAgICAgICAgICAgY29uc3Qgc3JjID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2VsZWN0cm9uL21haW4vc2VydmljZXMvaW50ZWxsaWdlbmNlL3Byb21wdHMnKVxuICAgICAgICAgICAgICAgICAgY29uc3QgZGVzdCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuYnVpbGQvZGlzdC1lbGVjdHJvbi9tYWluL3Byb21wdHMnKVxuICAgICAgICAgICAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMoc3JjKSkge1xuICAgICAgICAgICAgICAgICAgICBmcy5jcFN5bmMoc3JjLCBkZXN0LCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgICBhbGlhczoge1xuICAgICAgICAgICAgICAgICdAZWxlY3Ryb24nOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnZWxlY3Ryb24vbWFpbicpLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuXG4gICAgICAgIHByZWxvYWQ6IHtcbiAgICAgICAgICBpbnB1dDogJ2VsZWN0cm9uL3ByZWxvYWQvaW5kZXgudHMnLFxuICAgICAgICAgIHZpdGU6IHtcbiAgICAgICAgICAgIGJ1aWxkOiB7XG4gICAgICAgICAgICAgIHNvdXJjZW1hcDogc291cmNlbWFwID8gJ2lubGluZScgOiB1bmRlZmluZWQsIC8vICMzMzJcbiAgICAgICAgICAgICAgbWluaWZ5OiBpc0J1aWxkLFxuICAgICAgICAgICAgICBvdXREaXI6ICcuYnVpbGQvZGlzdC1lbGVjdHJvbi9wcmVsb2FkJyxcbiAgICAgICAgICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICAgICAgICAgIGV4dGVybmFsOiBPYmplY3Qua2V5cygnZGVwZW5kZW5jaWVzJyBpbiBwa2cgPyBwa2cuZGVwZW5kZW5jaWVzIDoge30pLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgICAgYWxpYXM6IHtcbiAgICAgICAgICAgICAgICAnQGVsZWN0cm9uJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2VsZWN0cm9uL21haW4nKSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcblxuICAgICAgICByZW5kZXJlcjoge30sXG4gICAgICB9KSxcbiAgICBdLFxuXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ0BhcGknOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnZWxlY3Ryb24vbWFpbi9hcGknKSxcbiAgICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICBjbGVhclNjcmVlbjogZmFsc2UsXG4gIH1cbn0pXG4iLCAie1xuICBcIm5hbWVcIjogXCJhdGxhc1wiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiQW4gQUktcG93ZXJlZCBjb21wdXRlci11c2UgYWdlbnQgYnVpbHQgd2l0aCBFbGVjdHJvbi5cIixcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMi4zXCIsXG4gIFwibGljZW5zZVwiOiBcIkFwYWNoZS0yLjBcIixcbiAgXCJtYWluXCI6IFwiLmJ1aWxkL2Rpc3QtZWxlY3Ryb24vbWFpbi9pbmRleC5qc1wiLFxuICBcImF1dGhvclwiOiB7XG4gICAgXCJuYW1lXCI6IFwiZG9ydGFuZXNcIixcbiAgICBcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9kb3J0YW5lc1wiXG4gIH0sXG4gIFwiZW5naW5lc1wiOiB7XG4gICAgXCJub2RlXCI6IFwiPj0yMC4wLjBcIixcbiAgICBcInlhcm5cIjogXCI+PTEuMjIuMjJcIlxuICB9LFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiZ2l0K2h0dHBzOi8vZ2l0aHViLmNvbS9kb3J0YW5lcy9hdGxhcy5naXRcIlxuICB9LFxuICBcIm9zXCI6IFtcbiAgICBcIndpbjMyXCIsXG4gICAgXCJkYXJ3aW5cIixcbiAgICBcImxpbnV4XCJcbiAgXSxcbiAgXCJjcHVcIjogW1xuICAgIFwieDY0XCIsXG4gICAgXCJhcm02NFwiXG4gIF0sXG4gIFwiZGVidWdcIjoge1xuICAgIFwiZW52XCI6IHtcbiAgICAgIFwiVklURV9ERVZfU0VSVkVSX1VSTFwiOiBcImh0dHA6Ly8xMjcuMC4wLjE6MzM0NC9cIlxuICAgIH1cbiAgfSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImRldlwiOiBcInZpdGVcIixcbiAgICBcImJ1aWxkXCI6IFwibnBtIHJ1biBsaW50ICYmIHZpdGUgYnVpbGQgJiYgZWxlY3Ryb24tYnVpbGRlclwiLFxuICAgIFwicHJldmlld1wiOiBcInZpdGUgcHJldmlld1wiLFxuICAgIFwibGludFwiOiBcImVzbGludCAuIC0tZXh0IC52dWUsLmpzLC5qc3gsLnRzLC50c3hcIixcbiAgICBcImxpbnQ6Zml4XCI6IFwiZXNsaW50IC4gLS1leHQgLnZ1ZSwuanMsLmpzeCwudHMsLnRzeCAtLWZpeFwiXG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBlbGV2ZW5sYWJzL2VsZXZlbmxhYnMtanNcIjogXCJeMi4zOC4xXCIsXG4gICAgXCJAZ29vZ2xlL2dlbmFpXCI6IFwiXjEuNDQuMFwiLFxuICAgIFwiQGh1cmRsZWdyb3VwL3JvYm90anNcIjogXCJeMC4xMi4zXCIsXG4gICAgXCJAdGFpbHdpbmRjc3Mvdml0ZVwiOiBcIl40LjEuMTJcIixcbiAgICBcIkB0cnBjL2NsaWVudFwiOiBcIjEwLjQ1LjBcIixcbiAgICBcIkB0cnBjL3NlcnZlclwiOiBcIjEwLjQ1LjBcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLXZ1ZS1qc3hcIjogXCJeNS4wLjFcIixcbiAgICBcImNoZWVyaW9cIjogXCJeMS4yLjBcIixcbiAgICBcImRhaXN5dWlcIjogXCI1XCIsXG4gICAgXCJlbGVjdHJvbi10cnBjXCI6IFwiMC43LjFcIixcbiAgICBcIm9wZW5haVwiOiBcIl42LjI3LjBcIixcbiAgICBcInNjcmVlbnNob3QtZGVza3RvcFwiOiBcIl4xLjE1LjNcIixcbiAgICBcInRhaWx3aW5kY3NzXCI6IFwiXjQuMS4xMlwiLFxuICAgIFwidWlvaG9vay1uYXBpXCI6IFwiXjEuNS40XCIsXG4gICAgXCJ2b3NrLWJyb3dzZXJcIjogXCJeMC4wLjhcIixcbiAgICBcInZ1ZTMtZW1vamktcGlja2VyXCI6IFwiXjEuMS44XCIsXG4gICAgXCJ5YW5kZXgtYWxpY2UtY2xpZW50XCI6IFwiXjAuMy4xXCIsXG4gICAgXCJ6b2RcIjogXCJeNC4xLjFcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAZXNsaW50L2pzXCI6IFwiXjkuMzQuMFwiLFxuICAgIFwiQHR5cGVzL3NjcmVlbnNob3QtZGVza3RvcFwiOiBcIl4xLjE1LjBcIixcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9lc2xpbnQtcGx1Z2luXCI6IFwiXjguNDAuMFwiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L3BhcnNlclwiOiBcIl44LjQwLjBcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiOiBcIl41LjAuNFwiLFxuICAgIFwiQHZ1ZS9lc2xpbnQtY29uZmlnLXR5cGVzY3JpcHRcIjogXCJeMTQuNi4wXCIsXG4gICAgXCJlbGVjdHJvblwiOiBcIl4yOS40LjZcIixcbiAgICBcImVsZWN0cm9uLWJ1aWxkZXJcIjogXCJeMjQuMTMuM1wiLFxuICAgIFwiZXNsaW50XCI6IFwiXjkuMzQuMFwiLFxuICAgIFwiZXNsaW50LWNvbmZpZy1wcmV0dGllclwiOiBcIl4xMC4xLjhcIixcbiAgICBcImVzbGludC1wbHVnaW4tdnVlXCI6IFwiXjEwLjQuMFwiLFxuICAgIFwiZ2xvYmFsc1wiOiBcIl4xNi4zLjBcIixcbiAgICBcInR5cGVzY3JpcHRcIjogXCJeNS40LjJcIixcbiAgICBcInZpdGVcIjogXCJeNS4xLjVcIixcbiAgICBcInZpdGUtcGx1Z2luLWVsZWN0cm9uXCI6IFwiXjAuMjguNFwiLFxuICAgIFwidml0ZS1wbHVnaW4tZWxlY3Ryb24tcmVuZGVyZXJcIjogXCJeMC4xNC41XCIsXG4gICAgXCJ2dWVcIjogXCJeMy40LjIxXCIsXG4gICAgXCJ2dWUtZXNsaW50LXBhcnNlclwiOiBcIl4xMC4yLjBcIixcbiAgICBcInZ1ZS10c2NcIjogXCJeMi4wLjZcIlxuICB9LFxuICBcInBhY2thZ2VNYW5hZ2VyXCI6IFwieWFybkAxLjIyLjIyXCIsXG4gIFwidm9sdGFcIjoge1xuICAgIFwibm9kZVwiOiBcIjIwLjE5LjRcIixcbiAgICBcInlhcm5cIjogXCIxLjIyLjIyXCJcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFnVixPQUFPLFFBQVE7QUFDL1YsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sU0FBUztBQUNoQixPQUFPLGNBQWM7QUFDckIsT0FBTyxZQUFZOzs7QUNObkI7QUFBQSxFQUNFLE1BQVE7QUFBQSxFQUNSLGFBQWU7QUFBQSxFQUNmLE1BQVE7QUFBQSxFQUNSLFNBQVc7QUFBQSxFQUNYLFNBQVc7QUFBQSxFQUNYLE1BQVE7QUFBQSxFQUNSLFFBQVU7QUFBQSxJQUNSLE1BQVE7QUFBQSxJQUNSLEtBQU87QUFBQSxFQUNUO0FBQUEsRUFDQSxTQUFXO0FBQUEsSUFDVCxNQUFRO0FBQUEsSUFDUixNQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsWUFBYztBQUFBLElBQ1osTUFBUTtBQUFBLElBQ1IsS0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUNBLElBQU07QUFBQSxJ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

/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import { storybookTest } from "@storybook/experimental-addon-test/vitest-plugin";
import { storybookNextJsPlugin } from "@storybook/experimental-nextjs-vite/vite-plugin";

export default defineConfig({
  plugins: [react(), storybookTest(), storybookNextJsPlugin()],
  test: {
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.stories.?(m)[jt]s?(x)"],
    browser: {
      enabled: true,
      name: "chromium",
      provider: "playwright",
      headless: true,
      providerOptions: {
        launch: {
          devtools: true,
        },
      },
    },
    isolate: false,
  },
});

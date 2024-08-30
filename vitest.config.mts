import { defineConfig } from "vitest/config";

export default defineConfig({
    appType: "custom",
    test: {
        coverage: {
            enabled: true,
            provider: "v8",
        },
    },
});

import { defineConfig } from 'vitest/config';

// `test/integration/**` exercises a real screeps server via
// `screeps-server-mockup` and is documented as opt-in (see
// `docs/in-depth/testing.md`). We exclude it from the default `vitest run`
// so CI doesn't try to boot a screeps server. Run it locally with
// `yarn test:integration`.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/unit/**/*.test.ts'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.ts'],
      exclude: ['src/main.ts', '**/*.d.ts'],
    },
  },
  resolve: {
    alias: {
      // Match tsconfig's `baseUrl: "src/"` so imports like
      // `import { ... } from 'utils/ErrorMapper'` resolve in tests too.
      utils: new URL('./src/utils', import.meta.url).pathname,
    },
  },
});

import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    strictPort: true,
    watch: {
      // Exclude Cargo build output — Vite watching these causes EBUSY conflicts
      ignored: ['**/src-tauri/**'],
    },
  },
  // @tauri-apps/api is provided by the Tauri runtime — skip pre-bundling so the
  // dynamic import() try/catch fallback in main.js works in plain browser mode.
  optimizeDeps: {
    exclude: ['@tauri-apps/api'],
  },
});

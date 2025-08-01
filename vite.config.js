import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
})

//2
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   build: {
//     target: 'esnext',
//     commonjsOptions: {
//       ignoreDynamicRequires: true,
//     }
//   },
//   optimizeDeps: {
//     exclude: ['firebase', '@tanstack/react-query'],
//   },
//   ssr: {
//     noExternal: ['firebase', '@tanstack/react-query']
//   }
// });

//3
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   build: {
//     target: 'esnext',
//     commonjsOptions: {
//       ignoreDynamicRequires: true,
//     },
//   },
//   optimizeDeps: {
//     exclude: ['firebase', '@tanstack/query-core', '@tanstack/react-query'],
//   },
//   ssr: {
//     noExternal: ['firebase', '@tanstack/query-core', '@tanstack/react-query']
//   }
// });

//4
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   base: '/', // ✅ Important for Firebase Hosting
//   plugins: [react()],
//   build: {
//     target: 'esnext',
//     commonjsOptions: {
//       ignoreDynamicRequires: true,
//     },
//   },
//   optimizeDeps: {
//     exclude: ['firebase', '@tanstack/query-core', '@tanstack/react-query'],
//   },
//   ssr: {
//     noExternal: ['firebase', '@tanstack/query-core', '@tanstack/react-query'],
//   },
// });

//npm uninstall rollup
//npm install rollup@4.44.0



import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  root: '',
  build: {
    outDir: 'docs'
  },
  lib: {
    entry: '/src/assets/js/d3.v7.min.js',
    name: 'MyLib',
    fileName: (format) => `d3.v7.min.${format}.js`
  }
})


// build: {
//   lib: {
//     entry: path.resolve(__dirname, 'lib/main.js'),
//     name: 'MyLib',
//     fileName: (format) => `my-lib.${format}.js`
//   },
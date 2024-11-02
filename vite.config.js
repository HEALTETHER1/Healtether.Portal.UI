import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { readdirSync } from 'fs'
import { resolve } from 'path';

let absolutePathAliases = {};
// Root resources folder
const srcPath = path.resolve('./src/');
// Ajust the regex here to include .vue, .js, .jsx, etc.. files from the resources/ folder
const srcRootContent = readdirSync(srcPath, { withFileTypes: true }).map((dirent) =>
{
  return  dirent.name.replace(/(\.jsx){1}(x?)/, '')
});

srcRootContent.forEach((directory) => {
 
  absolutePathAliases[directory] = path.join(srcPath, directory);
});


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //root: 'src',
 resolve:{
  alias: {
    ...absolutePathAliases
  },
  mainFields:["browser"],
 },
 build: {
  rollupOptions: {
    input: {
      main: resolve(__dirname, 'index.html'),
    }
  }
}
}
)

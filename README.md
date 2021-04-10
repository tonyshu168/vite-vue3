# vite-vue3
vite + vue3
### 初始化项目  
* npm init @vitejs/app 或 yarn create @vite/app  
再接提示操作

* 安装依赖: npm install或yarn install

### vite2配置
* alias: 在根目录下vite.config.js文件中添加alias
```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

export default defineConfig({
  alias: {
    '@': path.resolve(__dirname, 'src')
  },
  plugins: [vue()]
})
```
使用方法: import HelloWorld from '@/components/HelloWorld.vue'
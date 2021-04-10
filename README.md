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

### vue jsx的支持
1. 安装@vitejs/plugin-vue-jsx: npm i @vitejs/plugin-vue-jsx --dev
2. 在vite.config.js配置文件中添加vueJsx
```js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  alias: {
    '@': path.resolve(__dirname, 'src')
  },
  plugins: [vue(), vueJsx()]
})
```
3. 示例src/components/Comp.vue
```js
<script lang='jsx'>
// jsx原始写法
// export default {
//   data() {
//     return {
//       counter: 0,
//     }
//   },
//   methods: {
//     increment() {
//       this.counter++;
//     }
//   },
//   render() {
//     return (
//       <div>
//         <div>comp</div>
//         <div onClick={this.increment}>{this.counter}</div>
//       </div>
//     )
//   }
// }

// 别一种写法
import { ref } from 'vue';
export default {
  setup() {
    const counter = ref(0);
    const increment = () => {
      counter.value++;
    }

    return() => {
      return (
      <div>
        <p>comp</p>
        <p onClick={increment}>{counter.value}</p>
      </div>
      )
    }
  }
}
</script>
```
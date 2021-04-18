# vite-vue3
vite + vue3

# 2021年vite-vue3项目实践(上)  
vite + vue3现在可以说是前端最热门的开发组合，也能为开发提供高效的，流畅的开发体验，现在我带大家体验一下。

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

### vue3 setup script详解
1. 直接引入组件
2. 属性定义(见上代码)
3. 定义事件(见上代码)
4. 获取上下文(见上代码)
```vue
<template>
  <h1>{{ msg }}</h1>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">Vite Documentation</a> |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button @click="state.count++">count is: {{ state.count }}</button>
  <!-- <button @click="emit('output')">emit</button> -->
  <button @click="output">emit</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
    <Comp />
  </p>
</template>

<script setup>
// 直接引入组件
import Comp from './Comp.vue';
import { defineProps, reactive, defineEmit, useContext } from 'vue';
// 属性定义
defineProps({
  msg: String
})

// 定义事件
const emit = defineEmit(['output']);
function output() {
  // emit('output');
  ctx.emit('output');
}

// 获取上下文
const ctx = useContext();
console.log('ctx: ', ctx);
ctx.expose({
  someMethod() {
    console.log('do some thing from HelloWorld Component');
  }
})

const state = reactive({ count: 0 })
</script>
```
5. 对外直接暴露接口 

  - 1.获取上下文，在上下文expose方法中写入对外暴露接口。
  ```js
  // 在HelloWorld.vue中
  const ctx = useContext();
  ctx.expose({
    someMethod() {
      console.log('do some thing from HelloWorld Component');
    }
  })
  ```
  - 2.在引用HelloWorld的组件上调用，需要获取HelloWorld的组件实例
  ```vue
  <script setup lang="jsx">
  import { defineComponent, ref } from "vue";
  import HelloWorld from "./components/HelloWorld.vue";
  import Comp from './components/Comp.vue';
  import logo from "./assets/logo.png";
  const hw = ref(null);

  export default defineComponent({
    methods: {
      output() {
        console.log('output from helloworld component');
        hw.value.someMethod();
      },
    },
    render() {
      return (
      <div>
        <img alt="Vue logo" src={logo} />
        <HelloWorld msg="Hello Vue 3 + Vite" onOutput={this.output} ref={hw}/>
        <Comp />
      </div>
      )
    },
  });
  </script>
  ```

  后面再添加mock数据，路由，状态管理，再加上组件库，最后再结合typescript.

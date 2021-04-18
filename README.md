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
  [项目地址](https://github.com/tonyshu168/vite-vue3)

  # 2021年vite-vue3项目实践(中) 接上

  ### Mock插件应用
  1. 插件的安装
  ```hs
  npm i vite-plugin-mock -D 或 yarn add vite-plugin-mocke -D
  // 运行时依赖
  yarn add mockjs
  ```
  2. mockjs的配置  
    1. vite.config.js中的配置
    ```js
      // 引入plugin-mock
      import { viteMockServe } from 'vite-plugin-mock';
      // defineConfig配置中plugins添加viteMockServe
      export default defineConfig({
        plugins: [vue(), vueJsx(), viteMockServe({
          supportTs: false               // 对typescript的支持的开关, 这个是重点, 要不然mockjs使用不了
        })]
      })
    ```
    2. 项目的根目录下创建mock目录, 并写上mock接口
    ```js
    export default [
      {
        url: '/api/getUsers',
        method: 'get',
        response: () => {
          return {
            code: 0,
            message: 'ok',
            data: ['Tony', 'Aric']
          }
        }
      }
    ]
    ```
    3. 在package.json中的"scripts"设置环境变量为development
    ```json
    // 如没安装cross-env需要安装一下cross-env
    "scripts": {
      "dev": "cross-env NODE_ENV=development vite",
    }
    ```
    4. 在组件中调用
    ```vue
    <script setup>
    // 请求mock api
    fetch('/api/getUsers').then(res => {
      console.log('response: ', res);
    })
    </script>
    ```

  ### vue-router4与vuex4的整合
  1. 安装vue-router与vuex4
```hs
yarn add vue-router@next vuex@next 或 npm i vue-router@next vuex@next --save
```
  2. 创建vue-router文件夹与文件,在src下面创建router目录, 在router目录下面创建index.js文件  
  ```js
  import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

  // 工厂函数创建router实例
  const router = createRouter({
    history: createWebHashHistory(),          // hash模式， h5模式createWebHistory
    // history: createWebHistory(),
    routes: [
      { path: '/', component: () => import('views/Home.vue') }
    ]
  })

  export default router;
  ```

  3. 创建vuex文件夹与文件，在src下面新建store目录，在store目录中创建index.js文件
  ```js
  import { createStore } from 'vuex';

  export default createStore({
    state: {
      counter: 0
    },
    mutations: {
      increment(state) {
        state.counter++;
      }
    },
    actions: {}
  })
  ```

  4. 在main.js中引用vue-router, vuex
  ```js
  import { createApp } from 'vue'
  import App from './App.vue'
  import router from './router';
  import store from './store';

  createApp(App)
  .use(router)
  .use(store)
  .mount('#app')
  ```

  5. 在组件使用
  ```js
  $store.state.counter;
  $store.commit('increment');
  ```
  

  ### 样式的处理
  1. 安装对应css的依赖包，我们这里以sass为例
```
yarn add sass -D
```

  2. 在src下面创建styles目录，在styles目录下创建对应的样式文件。
  3. 在组件中引入样式
```js
import 'styles/index.scss';
```

  ### 引入Element3
  1. 安装element3, yarn add element3
  2. 全局引入element3, 需引入element3级对应的样式
```js
// 全局引入
import element3 from 'element3';
import 'element3/lib/theme-chalk/index.css';


createApp(App)
.use(router)
.use(store)
.use(element3)
.mount('#app')
```

  2. 按需引入element3
```js
import { ElButton } from 'element3';
import 'element3/lib/theme-chalk/button.css';

createApp(App)
.use(router)
.use(store)
.use(ElButton)
.mount('#app')
```

  2. 使用插件方法按需引入，先在src下创建plugins目录，再在plugins目录下创建element3.js，还需在main.js引用
```js
// src/plugins/element3.js
import { ElButton, ElInput } from 'element3';
import 'element3/lib/theme-chalk/button.css';
import 'element3/lib/theme-chalk/input.css';

export default function(app) {
  app.use(ElButton).use(ElInput);
}
```
```js
// main.js
// 插件方法引入
import element3 from 'plugins/element3';

createApp(App)
.use(router)
.use(store)
.use(element3)
.mount('#app')
```

未完待续...  
[项目地址](https://github.com/tonyshu168/vite-vue3)



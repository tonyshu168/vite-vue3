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

# 2021年vite-vue3项目实践(下) 接上

### 页面的布局
1. 修改router/index.js文件
```js
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import Layout from '../laylouts/index.vue';

// 工厂函数创建router实例
const router = createRouter({
  history: createWebHashHistory(),          // hash模式， h5模式createWebHistory
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        { path: '/', component: () => import('views/Home.vue') }
      ]
    }
  ]
})

export default router;
```

2. 在src目录下新建layouts目录，并在layouts目录下创建index.vue文件，创建components目录，在components目录下创建Navbar.vue, AppMain.vue文件
```vue
// src/layouts/index.vue
<script setup lang="jsx">
import { defineProps, reactive, defineEmit, useContext } from 'vue';
import NavBar from './components/Navbar.vue';
import AppMain from './components/AppMain.vue';

export default {
  setup() {

    return() => {
      return (
      <div>
        <nav></nav>
        <main>
          <NavBar></NavBar>
          <AppMain></AppMain>
        </main>
      </div>
      )
    }
  }
}
</script>
```

```vue
// src/layouts/components/Navbar.vue
<script setup lang="jsx">
export default {
  setup() {

    return () => {
      return (
        <div class="navbar">
          <div class="right-menu">
            <el-dropdown class="avatar-container" trigger="click">
              <div class="avatar-wrapper">
                <img src="/src/assets/logo.png" class="user-avatar" />
                <i class="el-icon-caret-bottom" />
              </div>
              <el-dropdown-menu class="user-dropdown">
                <router-link to="/">
                  <el-dropdown-item> 首页 </el-dropdown-item>
                </router-link>
                <a target="_blank" href="https://github.com/tonyshu168/vite-vue3">
                  <el-dropdown-item>我的Github</el-dropdown-item>
                </a>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      )
    }
  }
}
</script>
<style lang="scss" scope>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
```

```vue
// src/layouts/components/AppMain.vue
<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
      <component :is="Component" />
      </transition>
    </router-view>
  </section>
</template>

<script>
export default {
  name: "AppMain",
};
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>
```

### 动态导航侧边栏
1. 开发侧边栏(src/layouts/components/Sidebar), 还需安装path-browserify。
目录结构如下:  
-- src/layouts/components/Sidebar  
-- index.vue, SidebarItem.vue, Item.vue, Link.vue

```vue
// Sidebar/index.uve
<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="activeMenu"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :unique-opened="false"
      :active-text-color="variables.menuActiveText"
      mode="vertical"
    >
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </el-scrollbar>
</template>
<script setup>
import SidebarItem from './SidebarItem.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { routes } from "router";
import variables from 'styles/variables.module.scss';
console.log('routes', routes );
const activeMenu = computed(() => {
  const route = useRoute();
  const { meta, path } = route;

  if ( meta.activeMenu ) {
    return meta.activeMenu;
  }

  return path;
})
</script>
```

```vue
// Sidebar/SidebarItem.vue
<template>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <item
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template #title>
        <item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script setup>
import path from "path-browserify";
import Item from "./Item.vue";
import AppLink from "./Link.vue";
import { isExternal } from "utils/validate.js";
import { defineProps, ref } from "vue";

const props = defineProps({
  // route object
  item: {
    type: Object,
    required: true,
  },
  isNest: {
    type: Boolean,
    default: false,
  },
  basePath: {
    type: String,
    default: "",
  },
});
const onlyOneChild = ref(null);
const hasOneShowingChild = (children = [], parent) => {
  const showingChildren = children.filter((item) => {
    if (item.hidden) {
      return false;
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = item;
      return true;
    }
  });
  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true;
  }
  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
    return true;
  }
  return false;
};
const resolvePath = (routePath) => {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }
  return path.resolve(props.basePath, routePath);
};
</script>

```

```vue
// Sidebar/Item.vue
<template>
  <i v-if="icon" class="sub-el-icon" :class="icon"></i>
  <span v-if="title">{{ title }}</span>
</template>
<script setup>
import { defineProps } from "vue";

defineProps({
  icon: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
```

```vue
// Sidebar/Link.vue
<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script setup>
import { isExternal as isExt } from "utils/validate";
import { computed, defineProps } from "vue";

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
});

const isExternal = computed(() => isExt(props.to));

// type是一个计算属性
const type = computed(() => {
  if (isExternal.value) {
    return "a";
  }
  return "router-link";
});

const linkProps = (to) => {
  if (isExternal.value) {
    return {
      href: to,
      target: "_blank",
      rel: "noopener",
    };
  }
  return { to };
};
</script>
```

### 面包屑的开发
router/index.js配置如下： 

```js
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import Layout from '../laylouts/index.vue';

export const routes = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    alwaysShow: true,
    meta: { title: '导航', icon: 'el-icon-setting' },
    children: [
      {
        path: 'home',
        component: () => import('views/Home.vue'),
        name: 'Home',
        meta: { title: '首页', icon: 'el-icon-s-home' },
        children: [
          {
            path: ':id',
            component: () => import('views/detail.vue'),
            name: 'Detail',
            meta: {
              title: '详情',
              icon: 'el-icon-s-home',
              activeMenu: '/home'
            }
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),          // hash模式， h5模式createWebHistory
  // history: createWebHistory(),
  routes
})

export default router;
```

开发Breadcrumb.vue组件，需要安装依赖path-to-regexp进行路由的匹配与解释  

```vue
// src/layouts/components/Breadcrumb.vue
<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, idx) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || idx == levelList.length - 1"
          class="no-redirect"
        >{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { compile } from 'path-to-regexp';
import { reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const levelList = ref(null);
const router = useRouter();
const route = useRoute();

function getBreadcrumb() {
  let matched = route.matched.filter(item => item.meta && item.meta.title);

  const first = matched[0];
  if ( first.path !== '/' ) {
    matched = [{ path: 'home', meta: { title: '首页'} }].concat(metched);
  }

  levelList.value = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false);
}

function pathCompile( path ) {
  const toPath = compile(path);
  return toPath(route.params);
}

function handleLink( item ) {
  const { redirect, path } = item;
  if ( redirect ) {
    router.push(redirect);
    return;
  }

  router.push(pathCompile(path));
}

getBreadcrumb();

watch(route, getBreadcrumb);
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
```

在src/layouts/components/Navbar.vue中添加Breadcrumb.vue组件
```vue
<script setup lang="jsx">
import Breadcrumb from './Breadcrumb.vue';

export default {
  setup() {

    return () => {
      return (
        <div class="navbar">
          <Breadcrumb class="breadcrumb-container"></Breadcrumb>
          
          <div class="right-menu">
            <el-dropdown class="avatar-container" trigger="click">
              <div class="avatar-wrapper">
                <img src="/src/assets/logo.png" class="user-avatar" />
                <i class="el-icon-caret-bottom" />
              </div>
              <el-dropdown-menu class="user-dropdown">
                <router-link to="/">
                  <el-dropdown-item> 首页 </el-dropdown-item>
                </router-link>
                <a target="_blank" href="https://github.com/tonyshu168/vite-vue3">
                  <el-dropdown-item>我的Github</el-dropdown-item>
                </a>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      )
    }
  }
}
</script>
```

### 数据封装
1. 安装axios:  
```
npm i axios -D 或 yarn add axios -D
```
2. 配置开发与生产环境的路径, 项目根目录下.env.development
```
VITE_BASE_API=/api
```

3. 数据封装文件: src/utils/request.js
```js
import axios from 'axios';
import { Message, Msgbox } from 'element3';
import store from 'store';

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
});

service.interceptors.request.use(
  config => {
    config.headers['X-Token'] = 'my token';
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    const res = response.data;

    if ( res.code !== 2000 ) {
      Message.error({
        message: res.message || 'Error',
        duration: 5 * 1000
      });

      // 5008: 非法令牌; 5012: 其他客户端已登入; 5014: 令牌过期;
      if (res.code === 5008 || res.code === 5012 || res.code === 5014 ) {
        Msgbox.confirm('您已登出，请重新登录', '确认', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload();
          })
        })
      }

      return Promise.reject(new Error(res.message || 'Error'));
    }
    else {
      return res;
    }
  },
  error => {
    console.log('Err ' + error);
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });

    return Promise.reject(error);
  }
)

export default service;
```

4. 测试数据文件: scr/components/HelloWorld.vue
```js
import request from 'utils/request';

try {
  const users = await request('/users');
  console.log('users: ', users);
}
catch( error ) {
  console.log('error', error);
}
```

### 表格数据的展现与管理
* 首先mock数据，项目根目录下mock/user.js
```js
const mockList = [
  { id: 1, name: "tom", age: 18 },
  { id: 2, name: "jerry", age: 18 },
  { id: 3, name: "tony", age: 18 },
  { id: 4, name: "jack", age: 18 },
  { id: 5, name: "aric", age: 18 },
  { id: 6, name: "white", age: 18 },
  { id: 7, name: "peter", age: 18 },
  { id: 8, name: "jay", age: 18 },
];

module.exports = [
  {
    url: "/api/getUser",
    type: "get",
    response: () => {
      return {
        code: 2000,
        data: { id: 1, name: "tom", age: 18 },
      };
    },
  },
  {
    url: "/api/getUsers",
    type: "get",
    response: (config) => {
      // 从查询参数中获取分页、过滤关键词等参数
      const { page = 1, limit = 5 } = config.query;

      // 分页
      const data = mockList.filter(
        (item, index) => index < limit * page && index >= limit * (page - 1)
      );

      return {
        code: 2000,
        data,
        total: mockList.length,
      };
    },
  },
  {
    url: "/api/addUser",
    type: "post",
    response: () => {
      // 直接返回
      return {
        code: 2000,
      };
    },
  },
  {
    url: "/api/updateUser",
    type: "post",
    response: () => {
      return {
        code: 2000,
      };
    },
  },
  {
    url: "/api/deleteUser",
    type: "get",
    response: () => {
      return {
        code: 2000,
      };
    },
  },
];
```

* 添加路由
```js
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import Layout from '../laylouts/index.vue';

export const routes = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    alwaysShow: true,
    meta: { title: '导航', icon: 'el-icon-setting' },
    children: [
      {
        path: 'home',
        component: () => import('views/Home.vue'),
        name: 'Home',
        meta: { title: '首页', icon: 'el-icon-s-home' },
        children: [
          {
            path: ':id',
            component: () => import('views/detail.vue'),
            name: 'Detail',
            meta: {
              title: '详情',
              icon: 'el-icon-s-home',
              activeMenu: '/home'
            }
          }
        ]
      }
    ]
  },

  {
    path: "/users",
    component: Layout,
    meta: {
      title: "用户管理",
      icon: "el-icon-user-solid",
    },
    redirect: '/users/list',
    children: [
      {
        path: "list",
        component: () => import("views/users/list.vue"),
        meta: {
          title: "用户列表",
          icon: "el-icon-document",
        },
      },
      {
        path: "create",
        component: () => import("views/users/create.vue"),
        hidden: true,
        meta: {
          title: "创建新用户",
          activeMenu: "/users/list",
        },
      },
      {
        path: "edit/:id(\\d+)",
        name: "userEdit",
        component: () => import("views/users/edit.vue"),
        hidden: true,
        meta: {
          title: "编辑用户信息",
          activeMenu: "/users/list",
        },
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),          // hash模式， h5模式createWebHistory
  // history: createWebHistory(),
  routes
})

export default router;
```

* 在views目录下创建users目录，在users目录分别创建model, components目录，并在components目录下创建detail.vue，modal目录下创建userModel.js, users目录分别创建list.uve，edit.vue，create.vue  
```vue
// users/list.vue
<template>
  <div class="app-container">
    <div class="btn-container">
      <!-- 新增按钮 -->
      <router-link to="/users/create">
        <el-button type="success" icon="el-icon-edit">创建用户</el-button>
      </router-link>
    </div>

    <el-table
      v-loading="loading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="ID" prop="id"></el-table-column>
      <el-table-column align="center" label="账户名" prop="name"></el-table-column>
      <el-table-column align="center" label="年龄" prop="age"></el-table-column>
      <!-- 操作列 -->
      <el-table-column label="操作" align="center">
        <template v-slot="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="handleUpdate(scope)"
            >更新</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-remove"
            @click="handleDelete(scope)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分布 -->
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="listQuery.page"
      v-model:limit="listQuery.limit"
      @pagination="getList"
    ></pagination>
  </div>
</template>

<script>
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { Message } from 'element3';
import Pagination from 'comps/Pagination.vue';
import { useList } from './model/userModel';
export default {
  name: 'UserList',
  components: {
    Pagination
  },
  setup() {console.log('list.vue');
    // 用户数据列表
    const router = useRouter();
    const { state, getList, delItem } = useList();

    // 用户更新
    function handleUpdate({ row }) {
      router.push({
        name: 'userEdit',
        params: { id: row.id }
      })
    }

    // 删除用户
    function handleDelete({ row }) {
      delItem(row.id).then(() => {
        // todo: 删除这一行或重新获取数据
        // 通知用户
        Message.success('删除成功!');
      })
    }

    return {
      ...toRefs(state),
      getList,
      handleUpdate,
      handleDelete
    }
  }
}
</script>

<style lang="scss" scope>
.btn-container {
  text-align: left;
  padding: 0px 10px 20px 0px;
}
</style>
```

```vue
// users/edit.vue
<template>
  <detail :is-edit="true"></detail>
</template>

<script>
import Detail from "./components/detail.vue";

export default {
  components: {
    Detail,
  },
};
</script>
```
```vue
// users/create.vue
<template>
  <detail :is-edit="false"></detail>
</template>

<script>
import Detail from "./components/detail.vue";

export default {
  components: {
    Detail,
  },
};
</script>
```

```vue
// users/components/detail.vue
<template>
  <div class="container">
    <el-form ref="form" :model="model" :rules="rules">
      <el-form-item prop="name" label="用户名">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item prop="age" label="用户年龄">
        <el-input v-model.number="model.age"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm" type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Message } from "element3";
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { useItem } from "../model/userModel";

export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    // 路由
    const route = useRoute();
    const { model, addUser, updateUser } = useItem(props.isEdit, route.params.id);
    const rules = reactive({
      // 校验规则
      name: [{ required: true, message: "用户名为必填项" }],
    });

    // 表单实例
    const form = ref(null);
    // 提交表单
    function submitForm() {
      // 校验
      form.value.validate((valid) => {
        if (valid) {
          // 提交
          if (props.isEdit) {
            updateUser().then(() => {
              // 操作成功提示信息
              Message.success({
                title: "操作成功",
                message: "更新用户数据成功",
                duration: 2000,
              });
            });
          } else {
            addUser().then(() => {
              // 操作成功提示信息
              Message.success({
                title: "操作成功",
                message: "新增玩家数据成功",
                duration: 2000,
              });
            });
          }
        }
      });
    }

    return {
      model,
      rules,
      form,
      submitForm,
    };
  },
};
</script>

<style scoped>
.container {
  padding: 10px;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
```

```vue
// model/userModel.js
import { reactive, onMounted, ref } from 'vue';
import request from 'utils/request';

export function useList() {
  // 列表数据
  const state = reactive({
    loading: true,          // 加载状态
    list: [],               // 列表数据
    total: 0,
    listQuery: {
      page: 1,
      limit: 5
    }
  });

  // 获取列表数据
  function getList() {
    state.loading = true;

    return request({
      url: '/getUsers',
      method: 'get',
      params: state.listQuery
    })
    .then(({ data, total }) => {
      state.list = data;
      state.total = total;
    })
    .finally(() => {
      state.loading = false;
    })
  }

  // 删除项
  function delItem(id) {
    state.loading = true;

    return request({
      url: '/deleteUser',
      method: 'get',
      params: { id }
    })
    .finally(() => {
      state.loading = false;
    })
  }

  // 首次获取数据
  getList();

  return { state, getList, delItem };
}

const defaultData = {
  name: '',
  age: undefined
};

export function useItem(isEdit, id) {
  const model = ref(Object.assign({}, defaultData));

  // 初始化时，根据isEdit判定是否需要获取用户详情
  onMounted(() => {
    if ( isEdit && id ) {
      // 获取用户详情
      request({
        url: '/getUser',
        method: 'get',
        params: { id }
      })
      .then(({ data }) => {
        model.value = data;
      });
    }
  });

  const updateUser = () => {
    return request({
      url: '/updateUser',
      method: 'post',
      data: model.value
    })
  };

  const addUser = () => {
    return request({
      url: '/addUser',
      method: 'post',
      data: model.value
    })
  };

  return { model, updateUser, addUser };
}
```

* 在src/components目录下创建分页组件Pagination.vue
```vue
// src/components/Pagination.vue
<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      :background="background"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    total: {
      required: true,
      type: Number,
    },
    page: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 20,
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50];
      },
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
    background: {
      type: Boolean,
      default: true,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:page", "update:limit", "pagination"],
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("update:page", val);
      },
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit("update:limit", val);
      },
    },
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("pagination", { page: this.currentPage, limit: val });
    },
    handleCurrentChange(val) {
      this.$emit("pagination", { page: val, limit: this.pageSize });
    },
  },
};
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
}
.pagination-container.hidden {
  display: none;
}
</style>
```

### 项目打包, 将打包的目录上传到服务器对应目录即可。
```
yarn run build
```

[项目地址](https://github.com/tonyshu168/vite-vue3)
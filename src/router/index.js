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

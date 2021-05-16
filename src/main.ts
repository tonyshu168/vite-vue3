import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import 'styles/index.scss';

// 全局引入
// import element3 from 'element3';
// import 'element3/lib/theme-chalk/index.css';

// 插件方法引入
import element3 from 'plugins/element3';

createApp(App)
.use(router)
.use(store)
.use(element3)
.mount('#app')

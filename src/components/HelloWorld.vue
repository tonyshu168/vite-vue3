<template>
  <h1>{{ msg }}</h1>
  <p>{{$store.state.counter}}<button @click="$store.commit('increment')">increment</button></p>
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

const state = reactive({ count: 0 });

// 请求mock api
fetch('/api/getUsers').then(res => res.json())
.then(data => {
  console.log('data: ', data);
})
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
<!--
<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
</template>

<script setup>
import HelloWorld from './components/HelloWorld.vue'

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>
-->
<!-- 标记为jsx -->
<script lang="jsx">
import { defineComponent, ref } from "vue";
// import HelloWorld from './components/HelloWorld.vue'
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
      {/* <img alt="Vue logo" src={logo} /> */}
      {/*<HelloWorld msg="Hello Vue 3 + Vite" onOutput={this.output} ref={hw}/> */}
      {/* <Comp /> */}
      <router-view />
    </div>
    )
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
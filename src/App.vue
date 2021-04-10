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
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import Comp from './components/Comp.vue';
import logo from "./assets/logo.png"

export default defineComponent({
  render() {
    return (
    <div>
      <img alt="Vue logo" src={logo} />
      <HelloWorld msg="Hello Vue 3 + Vite" />
      <Comp />
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
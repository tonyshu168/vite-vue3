<template>
  <HelloWorld msg="home" />
  <router-link to="/home/1">detail1</router-link>
  <router-link to="/home/2">detail2</router-link>
  <router-view />
</template>
<script setup>
import HelloWorld from 'comps/HelloWorld.vue';
</script>
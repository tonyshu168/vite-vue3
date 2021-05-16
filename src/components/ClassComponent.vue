<!--
<template>
  <div class="class-component">
    <h1>{{ msg }}</h1>
    <p><input type="text" @keyup.enter="addFeature" /></p>
    <ul>
      <li v-for="feature in features"
        :key = "feature.id"
        :class = "{selected: feature.selected}"
      >{{feature.name}}</li>
      <li>特性总数: {{ count }}</li>
    </ul>
  </div>
</template>
-->
<script lang="ts">
/*
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

interface Feature {
  id: number;
  name: string;
  selected: boolean | number;
}

@Component
export default class ClassComponent extends Vue {
  @Prop({ type: String, required: true }) msg: string;

  features: Feature[] = [
    { id: 1, name: '类型注解', selected: false },
    { id: 2, name: '编译型语言', selected: true }
  ];

  @Emit()
  addFeature(e: KeyboardEvent) {
    const input = e.target as HTMLInputElement;
    const feature: Feature = {
      id: this.features.length + 1,
      name: input.vue,
      selected: false
    };

    this.features.push(feature);
    input.value = '';
  }

  get count() {
    return this.features.length;
  }
}
*/
</script>

<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
<template>
  <div class="container" ref="scrollContainer">
    <div v-for="(item, idx) in list" :key="idx">
      <p>{{ item.title }}</p>
    </div>
  </div>
</template>

<script setup>
import { useScrollLoad } from "@/composibles/scrollLoad";
import { ref } from "vue";

const scrollContainer = ref(null);

const { list } = useScrollLoad(window, (start, size) => {
  return `https://jsonplaceholder.typicode.com/todos?_start=${start}&_limit=${size}`;
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  /* border: 1px solid black; */
  /* overflow-y: scroll; */
  width: 80vw;
  height: 90vh;
}

.container > div {
  width: 100%;
  height: 30%;
}
</style>

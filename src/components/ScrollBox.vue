<template>
  <div class="container" ref="scrollContainer">
    <div v-for="(item, idx) in list" :key="idx">
      <p>{{ item.id }}</p>
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
  width: 80vw;
  display: flex;
  gap: 10px;
  flex-direction: column;
  /* overflow-y: scroll; */
  /* height: 90vh; */
}

.container > div {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10rem;
  border: 1px solid #c3c3c3;
  border-radius: 10px;
  box-shadow: 2px 4px 6px 0 rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
}
</style>

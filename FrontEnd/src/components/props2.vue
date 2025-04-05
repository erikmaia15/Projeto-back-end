<script setup>
const props = defineProps(["nome", "idade", "cidades"]);
</script>
<template>
  <h1>{{ nome }}</h1>
  <h1>{{ idade }}</h1>
  <ul>
    <li v-for="cidade in cidades">{{ cidade }}</li>
  </ul>
</template>

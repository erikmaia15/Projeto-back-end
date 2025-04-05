<script setup>
import { ref } from "vue";
var texto = ref("");
</script>

<template>
  <input type="text" name="" v-model="texto" id="" />
  <p>{{ texto }}</p>
</template>

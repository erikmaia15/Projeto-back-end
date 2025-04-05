<script setup>
import { onMounted, ref } from "vue";
var texto = ref("olá mundo!");
//serve para mudar com o tempo as coisas, o ref para atualziar a tela e o onmouted para fazer a mudança após isso
onMounted(() => {
  setTimeout(() => {
    texto.value = "calma rs sdjkcnlk.scnsdcjnsdjc";
  }, 3000);
});
</script>

<template>
  <h1>{{ texto }}</h1>
</template>

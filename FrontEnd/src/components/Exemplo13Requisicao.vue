<script setup>
import { onMounted, ref } from "vue";

const vetor = ref([]); // Use "const" para variáveis reativas

onMounted(async () => {
  try {
    const resposta = await fetch("https://jsonplaceholder.typicode.com/posts");
    vetor.value = await resposta.json(); // Atribui diretamente ao vetor.value
  } catch (erro) {
    console.error("Erro na requisição:", erro);
  }
});
</script>

<template>
  <h1>Requisições</h1>
  <table>
    <tr v-for="item in vetor" :key="item.id">
      <td>{{ item.id }}</td>
      <td>{{ item.title }}</td>
      <td>{{ item.body }}</td>
    </tr>
  </table>
</template>

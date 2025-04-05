<script setup>
function click() {
  alert("você clicou amostradinho");
}
function validar() {
  alert("você clicou amostradinho");
}
</script>
<style></style>
<template>
  <button type="button" @click="click">Clique aqui</button>
  <form action="" @submit="validar">
    <input type="text" placeholder="digite algo" />
    <input type="submit" value="confirmar" />
  </form>
</template>

<script setup>
var variavel = true;
</script>
<style>
.verdadeiro {
  color: green;
}
.falso {
  color: red;
}
</style>
<template>
  <div><p :class="variavel ? 'verdadeiro' : 'falso'">dscsdsvdvdfv</p></div>
</template>

<script setup>
var nome1 = true;
var nomes = ["erik", "maia", "gustavo", "evelyn", "calma"];
const condition = true;
</script>

<template>
  <p>{{ nome1 + "eriieriker" }}</p>
  <p v-if="nome1">
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto,
    voluptatem. Dicta, quasi deserunt. <br />
    Omnis numquam, dignissimos nulla blanditiis ab quis voluptas velit
    {{ nome1 }} <br />laudantium fugit odio adipiscdi quibusdam perspiciatis
    labore ame = ['erik', 'maia', 'gustavo', 'evelyn', 'calma'];periam.
  </p>
  <ul>
    <li v-for="nome in nomes">{{ nome }}</li>
  </ul>
</template>

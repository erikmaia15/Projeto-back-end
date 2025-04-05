<script setup>
import { ref } from "vue";
import axios from "axios";

const users = ref([]);
const novoUsuario = ref({
  nome: "",
  email: "",
  idade: "",
  senha: "",
});

// Carrega usuários inicialmente
const fetchUsers = async () => {
  const response = await axios.get("http://localhost:3000/usuarios");
  users.value = response.data;
};

// Adiciona novo usuário (sem recarregar)
const adicionarUsuario = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/cadastro",
      novoUsuario.value
    );
    users.value.push(response.data); // Adiciona à lista reativa
    novoUsuario.value = { nome: "", email: "", idade: "", senha: "" }; // Limpa o formulário
  } catch (error) {
    console.error("Erro:", error.response?.data || error.message);
  }
};

// Inicializa
fetchUsers();
</script>

<template>
  <div>
    <h1>Lista de Usuários</h1>

    <!-- Formulário de cadastro -->
    <form @submit.prevent="adicionarUsuario">
      <input v-model="novoUsuario.nome" placeholder="Nome" required />
      <input
        v-model="novoUsuario.email"
        type="email"
        placeholder="E-mail"
        required
      />
      <input v-model="novoUsuario.idade" type="number" placeholder="Idade" />
      <input
        v-model="novoUsuario.senha"
        type="password"
        placeholder="Senha"
        required
      />
      <button type="submit">Adicionar</button>
    </form>

    <!-- Lista de usuários -->
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.nome }} - {{ user.email }} ({{ user.idade }} anos)
      </li>
    </ul>
  </div>
</template>
<style>
form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: aqua;
  padding: 10px;
  gap: 10px;
  & input {
    border-radius: 20px;
    background-color: rgb(20, 207, 207);
    padding: 10px;
    border: none;
    color: aliceblue;
  }
  & button {
    padding: 10px;
    background-color: black;
    color: aliceblue;
    border-radius: 20px;
  }
}
</style>

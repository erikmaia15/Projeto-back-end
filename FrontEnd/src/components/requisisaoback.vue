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
const inputUser = ref(""); // Adicionei esta linha que estava faltando

const fetchUsers = async () => {
  try {
    const response = await axios.get("http://localhost:3000/usuarios");
    users.value = response.data;
  } catch (error) {
    console.error("Erro ao carregar usuários:", error);
  }
};

const adicionarUsuario = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/cadastro",
      novoUsuario.value
    );
    users.value.push(response.data);
    novoUsuario.value = { nome: "", email: "", idade: "", senha: "" };
  } catch (error) {
    console.error("Erro:", error.response?.data || error.message);
  }
};

async function deletarusuario(email) {
  try {
    if (!email) {
      alert("Por favor, insira um e-mail");
      return;
    }

    const response = await axios.post(
      "http://localhost:3000/deletarusuario",
      { email } // Envia como objeto
    );

    console.log(response.data.message);
    fetchUsers(); // Atualiza a lista após deletar
    inputUser.value = ""; // Limpa o campo
  } catch (error) {
    console.error(
      "Erro ao deletar usuário:",
      error.response?.data || error.message
    );
    alert(error.response?.data?.error || "Erro ao deletar usuário");
  }
}

fetchUsers();
</script>

<template>
  <div class="lista">
    <!-- Formulário de cadastro -->
    <form @submit.prevent="adicionarUsuario">
      <h1>Cadastro de usuários</h1>
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
    <br />
    <!-- Lista de usuários -->
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.nome }} - {{ user.email }} ({{ user.idade }} anos)
      </li>
    </ul>
  </div>
  <br />

  <div class="deletaruser">
    <h2>Deletar usuários</h2>
    <input type="text" v-model="inputUser" placeholder="email" />
    <input
      type="button"
      name=""
      value="confirmar"
      placeholder="Deletar"
      id=""
      @click="deletarusuario(inputUser)"
    />
  </div>
  <br />
  <br />
  <br />
</template>
<style>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.lista {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3vw;
  & ul {
    list-style: none;
  }
}
form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: rgb(0, 0, 0);
  padding: 20px;
  border-radius: 20px;
  gap: 10px;
  text-align: center;
  & input {
    border-radius: 20px;
    background-color: rgb(0, 0, 0);
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
  & h1 {
    color: aliceblue;
  }
}
.deletaruser {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: rgb(0, 0, 0);
  padding: 15px;
  border-radius: 20px;
  gap: 10px;
  text-align: center;
  color: aliceblue;
  width: 35vw;
  & input {
    border-radius: 20px;
    padding: 10px;
    margin-bottom: 3px;
  }
}
</style>

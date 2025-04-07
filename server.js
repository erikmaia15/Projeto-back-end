const express = require("express");
const app = express();
const port = 3000;

const cors = require("cors"); // Importe o pacote cors

// Configuração do CORS (coloque ANTES das rotas)
app.use(
  cors({
    origin: "http://localhost:5173", // Ou a porta onde seu Vue.js está rodando
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Conectando com o banco de dados
const Sequelize = require("sequelize");
const sequelize = new Sequelize("dbprojeto", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const Usuario = sequelize.define("usuarios", {
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  idade: {
    type: Sequelize.INTEGER,
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

app.use(express.json());

// Sincronizar o modelo com o banco de dados
sequelize
  .sync({ force: false }) // force: true recria as tabelas (cuidado em produção)
  .then(() => {
    console.log("✅ Banco de dados sincronizado");
  })
  .catch((err) => {
    console.error("❌ Erro ao sincronizar banco de dados:", err);
  });

// Funções auxiliares
async function criarUsuario(dados) {
  try {
    return await Usuario.create(dados);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
}

async function buscarUsuarioPorEmail(email) {
  try {
    return await Usuario.findOne({ where: { email } });
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    throw error;
  }
}

// Rotas
app.post("/cadastro", async (req, res) => {
  try {
    if (!req.body.email || !req.body.senha) {
      return res.status(400).json({ error: "E-mail e senha são obrigatórios" });
    }

    const usuarioExistente = await buscarUsuarioPorEmail(req.body.email);
    if (usuarioExistente) {
      return res.status(400).json({
        error: "E-mail já cadastrado",
      });
    }

    const usuario = await criarUsuario(req.body);
    const { senha: _, ...usuarioSemSenha } = usuario.toJSON();
    res.status(201).json(usuarioSemSenha);
  } catch (error) {
    console.error("Erro no cadastro:", error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: "E-mail e senha são obrigatórios" });
    }

    const usuario = await buscarUsuarioPorEmail(email);
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    if (usuario.senha !== senha) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    const { senha: _, ...usuarioSemSenha } = usuario.toJSON();
    res.json({ usuario: usuarioSemSenha });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro durante o login" });
  }
});

app.get("/usuarios", async (req, res) => {
  const usuarios = await Usuario.findAll({
    attributes: ["id", "nome", "email", "idade"], // Apenas estes campos
    raw: true,
  });
  res.json(usuarios);
});

app.post("/deletarusuario", async (req, res) => {
  try {
    const { email } = req.body; // Desestruturação mais limpa

    if (!email) {
      return res.status(400).json({ error: "E-mail é obrigatório!" });
    }

    const usuario = await buscarUsuarioPorEmail(email);

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado!" });
    }

    await usuario.destroy();
    res.json({ message: "Usuário deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(500).json({ error: "Erro interno ao apagar usuário!" });
  }
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});

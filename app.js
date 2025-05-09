const express = require('express');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
require('./database');

const app = express();
const bookRoutes = require('./routes/books');

// Garante que a pasta 'uploads/' existe
const uploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Middlewares
app.use(express.json());
app.use('/uploads', express.static(uploadPath));

// Rotas principais
app.use('/api/livros', bookRoutes); // ATENÇÃO: aqui uso /api/livros porque você mencionou isso várias vezes

// Rota raiz (healthcheck)
app.get('/', (req, res) => {
  res.send('Teste seu front-end com API de Livros online e funcional!');
});

// Tratamento para rotas inválidas
app.use((req, res, next) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Tratamento global de erros
app.use((err, req, res, next) => {
  console.error('Erro interno:', err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Inicialização
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor a correr na porta ${PORT}`);
});

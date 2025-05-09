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
app.use('/uploads', express.static(uploadPath)); // Expor arquivos públicos

// Rotas
app.use('/api/books', bookRoutes);

// Rota raiz (ping/health)
app.get('/', (req, res) => {
  res.send('API de Livros online e funcional!');
});

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor a correr em http://localhost:${PORT}`);
});


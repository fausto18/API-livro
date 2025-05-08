
const express = require('express');
const app = express();
const bookRoutes = require('./routes/books');
require('dotenv').config();
require('./database');

app.use(express.json());
app.use('/uploads', express.static('uploads')); // pasta pública para download
app.use('/api/books', bookRoutes);

// Rota raiz para verificação
app.get('/', (req, res) => {
  res.send('API de Livros online e funcional!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor a correr em http://localhost:${PORT}`);
});

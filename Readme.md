📚 Book API com Node.js, MySQL e Upload de Arquivos

Esta é uma API RESTful para gerenciamento de livros, desenvolvida com Node.js, Express, MySQL e Multer para upload de arquivos. Ideal para projetos que requerem cadastro e consulta de livros com anexos (ex: PDFs).

## 🚀 Tecnologias

- Node.js + Express
- MySQL (usando mysql2)
- Multer (upload de arquivos)
- UUID (geração de IDs únicos)
- Postman (para testes)

## 📁 Estrutura de Diretórios

book_api/
├── app.js
├── controllers/
│ └── booksController.js
├── routes/
│ └── books.js
├── uploads/ (criada automaticamente para armazenar arquivos)
├── database.js
└── package.json

## 📦 Instalação

```bash
npm install express multer mysql2 uuid

node app.js
O servidor iniciará em http://localhost:3000

🛠️ Endpoints da API
1. Criar livro
POST /api/books
Tipo: multipart/form-data
| Key    | Value                | Tipo     |
| ------ | -------------------- | -------- |
| title  | Nome do Livro        | **Text** |
| author | Autor Qualquer       | **Text** |
| file   | Selecione um arquivo | **File** |

2. Listar todos os livros
GET /api/books

3. Buscar livro por ID
GET /api/books/:id

4. Atualizar livro
PUT /api/books/:id
Tipo: multipart/form-data (enviar title, author, e opcionalmente novo file)

5. Deletar livro
DELETE /api/books/:id

6. Fazer download do arquivo
GET /api/books/download/:filename

📬 Testando com Postman
Use form-data nos métodos POST e PUT

Para file, selecione tipo File e escolha o arquivo local

Para GET, DELETE, e download, basta informar o ID ou nome do arquivo na URL

📌 Observações
Certifique-se de que a pasta uploads/ tenha permissão de escrita

Os arquivos são armazenados com prefixo de timestamp para evitar conflitos de nomes
"""
```

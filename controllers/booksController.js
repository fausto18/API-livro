const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const db = require('../database');

exports.createBook = async (req, res) => {
  const { title, author } = req.body;
  const file = req.file?.filename;
  const id = uuidv4();

  try {
    await db.execute('INSERT INTO books (id, title, author, file) VALUES (?, ?, ?, ?)',
      [id, title, author, file]);
    res.status(201).json({ id, title, author, file });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM books');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM books WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Livro não encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBook = async (req, res) => {
  const { title, author } = req.body;
  const file = req.file?.filename;

  try {
    const [rows] = await db.execute('SELECT * FROM books WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Livro não encontrado' });

    const oldBook = rows[0];
    const newFile = file || oldBook.file;

    await db.execute('UPDATE books SET title = ?, author = ?, file = ? WHERE id = ?',
      [title, author, newFile, req.params.id]);
    res.json({ id: req.params.id, title, author, file: newFile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM books WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Livro não encontrado' });

    const file = rows[0].file;
    await db.execute('DELETE FROM books WHERE id = ?', [req.params.id]);

    if (file) fs.unlink(path.join(__dirname, '../uploads', file), () => {});
    res.json({ message: 'Livro apagado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.downloadFile = (req, res) => {
  const filePath = path.join(__dirname, '../uploads', req.params.filename);
  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).json({ message: 'Ficheiro não encontrado' });
  }
};

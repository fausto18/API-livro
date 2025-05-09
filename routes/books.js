
const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  createBook, getBooks, getBookById,
  updateBook, deleteBook, downloadFile
} = require('../controllers/booksController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/', upload.single('file'), createBook);
router.get('/', getBooks);
router.get('/:id', getBookById);
router.put('/:id', upload.single('file'), updateBook);
router.delete('/:id', deleteBook);
router.get('/download/:filename', downloadFile);

module.exports = router;

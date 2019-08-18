import express from 'express';
const router = express.Router();

// import User, { IUser } from '../models/user';
import Book, { IBook } from '../models/book';
import Library, { ILibrary } from '../models/library';

// GET /api/library/:id - get the books in the user's library
router.get('/library/:id', (req, res) => {
  Library.findById(req.params.id).populate('books').exec((err, library: ILibrary) => {
    if (err) res.json(err)
    res.json(library)
  })
})

// GET /api/books - get alllll the books (temporary)
router.get('/books', (req, res) => {
  Book.find({}, (err, books) => {
    if (err) res.json(err)
    res.json(books)
  })
})

// POST /api/library/:id - post a book to a library!
router.post('/library/:id', (req, res) => {
  Book.findOne({isbn: req.body.isbn}, (err, book: IBook) => {
    if (err) res.json(err)
    if (!book) {
      Book.create({
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
      }, (err, book: IBook) => {
        if (err) res.json(err)
        Library.findById(req.params.id, (err, library: ILibrary) => {
          if (err) res.json(err)
          library.books.push(book._id)
          library.save()
          res.json(book)
        })
      })
    } else {
      Library.findById(req.params.id, (err, library: ILibrary) => {
        if (err) res.json(err)
        library.books.push(book._id)
        library.save()
        res.json(library)
      })
    }
  })
})

// POST /api/library/:id - post a loan to a library
router.post('/library/:lid/:bid', (req, res) => {
  
})

// DELETE /api/library/:id - delete a book from a library!
router.delete('/library/:lid/:bid', (req, res) => {
  console.log('i\'m gonna delete this:', req.params.bid)
  Library.findById(req.params.lid, (err, library: ILibrary) => {
    console.log('these are my books:', library.books)
    let index = library.books.indexOf(req.params.bid)
    console.log('that book is here', index)
    library.books.splice(index, 1)
    library.save()
    console.log('i may have removed a book...')
  })
  
  
  res.json(req.params.lid)
})

router.get('/', (req, res) => {
  res.json({type: 'success', message: 'You accessed the protected api routes'})
})

export default router;
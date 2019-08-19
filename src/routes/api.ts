import express from 'express';
const router = express.Router();

import Book, { IBook } from '../models/book';
import Library, { ILibrary } from '../models/library';
import Loan, { ILoan } from '../models/loan';
import Note, { INote } from '../models/notes';

// GET /api/library/:id - get the books in the user's library
router.get('/library/:id', (req, res) => {
  Library.findById(req.params.id).populate('books').exec((err, library: ILibrary) => {
    if (err) res.json(err)
    res.json(library)
  })
})

// GET /api/library/:lid/:bid - get loan associated with a book
router.get('/library/:lid/:bid', (req, res) => {
  Loan.findOne({libraryId: req.params.lid, bookId: req.params.bid}, (err, loan: ILoan) => {
    if (err) res.json(err)
    res.json(loan)
  })
})

// GET /api/library/:lid/:bid/notes - get notes for a book
router.get('/library/notes/:lid/:bid', (req, res) => {
  Note.findOne({libraryId: req.params.lid, bookId: req.params.bid}, (err, notes: INote) => {
    if (err) res.json(err)
    res.json(notes)
  })
})

// POST /api/library/notes - post a note to a book
router.post('/library/notes', (req, res) => {
  Note.findOne({libraryId: req.body.libraryId, bookId: req.body.bookId}, (err, notes: INote) => {
    if (err) res.json(err)
    if (!notes) {
      Note.create({
        libraryId: req.body.libraryId,
        bookId: req.body.bookId,
      }, (err, notes: INote) => {
        if (err) res.json(err)
        notes.notes.push({date: req.body.date, content: req.body.content})
        notes.save()
        res.json(notes)
      })
    } else {
      notes.notes.push({date: req.body.date, content: req.body.content})
      notes.save()
      res.json(notes)
    }
  })
})

// POST /api/library/book - post a book to a library!
router.post('/library/book', (req, res) => {
  Book.findOne({isbn: req.body.isbn}, (err, book: IBook) => {
    if (err) res.json(err)
    if (!book) {
      Book.create({
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
      }, (err, book: IBook) => {
        if (err) res.json(err)
        Library.findById(req.body.libraryId, (err, library: ILibrary) => {
          if (err) res.json(err)
          library.books.push(book._id)
          library.save()
          res.json(library)
        })
      })
    } else {
      Library.findById(req.body.libraryId, (err, library: ILibrary) => {
        if (err) res.json(err)
        library.books.push(book._id)
        library.save()
        res.json(library)
      })
    }
  })
})

// POST /api/library/loan - post a loan to a library
router.post('/library/loan', (req, res) => {
  Loan.findOne({bookId: req.body.bookId, libraryId: req.body.libraryId}, (err, loan: ILoan) => {
    if (err) res.json(err)
    if (!loan) {
      Loan.create({
        bookId: req.params.bid,
        libraryId: req.params.lid,
        currentStatus: true,
        loan: []
      }, (err, loan: ILoan) => {
        if (err) res.json(err)
        loan.loans.push({date: req.body.date, name: req.body.name})
        loan.save()
        res.json(loan)
      })
    } else {
      loan.loans.push({date: req.body.date, name: req.body.name})
      loan.currentStatus = true
      loan.save()
      res.json(loan)
    }
  })
})

// PUT /api/library/:id - check in a book that's checked out
router.put('/library/:id', (req, res) => {
  Loan.findById(req.params.id, (err, loan: ILoan) => {
    if (err) res.json(err)
    loan.currentStatus = req.body.currentStatus
    loan.save()
    res.json(loan)
  })
})

// DELETE /api/library/:id - delete a book from a library!
router.delete('/library/:lid/:bid', (req, res) => {
  Library.findById(req.params.lid, (err, library: ILibrary) => {
    let index = library.books.indexOf(req.params.bid)
    library.books.splice(index, 1)
    library.save()
    res.json(library)
  })
})

router.get('/', (req, res) => {
  res.json({type: 'success', message: 'You accessed the protected api routes'})
})

export default router;
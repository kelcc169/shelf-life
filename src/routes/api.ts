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

// POST /api/library/:id/:bid - post a loan to a library
router.post('/library/:lid/:bid', (req, res) => {
  console.log('here i am')
  Loan.findOne({bookId: req.params.bid, libraryId: req.params.lid}, (err, loan: ILoan) => {
    if (err) res.json(err)
    // if loan doesn't exist, make a new one
    if (!loan) {
      Loan.create({
        bookId: req.params.bid,
        libraryId: req.params.lid,
        currentStatus: true,
        loan: []
      }, (err, loan: ILoan) => {
        loan.loans.push({date: req.body.date, name: req.body.name})
        loan.save()
        res.json(loan)
      })
    // if loan exists, push new loan into loan array  
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
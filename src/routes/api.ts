import express from 'express';
const router = express.Router();

// import User, { IUser } from '../models/user';
import Book, { IBook } from '../models/book';
import Library, { ILibrary } from '../models/library';
import Loan, { ILoan } from '../models/loan';

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

// GET /api/books/:bid/:lib - get loan associated with a book
router.get('/library/:lid/:bid', (req, res) => {
  console.log('boop!')
  Loan.findOne({libraryId: req.params.lid, bookId: req.params.bid}, (err, loan: ILoan) => {
    if (err) res.json(err)
    res.json(loan)
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
        console.log('no loans found here yet! so I made one!', loan)
        loan.loans.push({date: req.body.date, name: req.body.name})
        loan.save()
        res.json(loan)
      })
    // if loan exists, push new loan into loan array  
    } else {
      console.log('i found one!', loan)
      loan.loans.push({date: req.body.date, name: req.body.name})
      loan.currentStatus = true
      loan.save()
      res.json(loan)
    }
  })
})

router.put('/library/:id', (req, res) => {
  console.log('hallo')
  Loan.findById(req.params.id, (err, loan: ILoan) => {
    if (err) res.json(err)
    loan.currentStatus = req.body.currentStatus
    loan.save()
    console.log(loan.currentStatus)
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
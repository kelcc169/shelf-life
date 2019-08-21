import mongoose from 'mongoose';

const loanSchema = new mongoose.Schema({
  bookId: {type: mongoose.Schema.Types.ObjectId, ref: 'Book'},
  libraryId: {type: mongoose.Schema.Types.ObjectId, ref: 'Library'},
  currentStatus: Boolean,
  loans: [{
    date: String,
    name: String
  }]
})

export interface LibraryCard {
  date: string;
  name: string;
}

export interface ILoan extends mongoose.Document {
  bookId: string;
  libraryId: string;
  currentStatus: boolean;
  loans: {date: string; name: string}[];
}

export default mongoose.model('Loan', loanSchema);
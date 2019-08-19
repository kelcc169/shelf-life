import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  bookId: {type: mongoose.Schema.Types.ObjectId, ref: 'Book'},
  libraryId: {type: mongoose.Schema.Types.ObjectId, ref: 'Library'},
  notes: [{
    date: String,
    content: String
  }]
})

export interface SingleNote {
  date: string;
  content: string;
}

export interface INote extends mongoose.Document {
  bookId: string;
  libraryId: string;
  notes: SingleNote[];
}

export default mongoose.model('Note', noteSchema);
import mongoose from 'mongoose';

const notesSchema = new mongoose.Schema({
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

export interface INotes extends mongoose.Document {
  bookId: string;
  libraryId: string;
  notes: SingleNote[];
}

export default mongoose.model('Notes', notesSchema);
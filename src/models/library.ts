import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const librarySchema = new Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  books: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}]
})

export interface ILibrary extends mongoose.Document {
  _id: string;
  userId: string;
  books: Array<string>;
}

export default mongoose.model('Library', librarySchema);
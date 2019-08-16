import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const bookSchema = new Schema({
  title: String,
  author: String,
  isbn: String
})

export interface IBook extends mongoose.Document{
  _id: string;
  title: string;
  author: string;
  isbn: string;
}

export default mongoose.model('Book', bookSchema);
import mongoose from 'mongoose';
import { IAuthenticated } from '../../src/models/user';
import { LibraryCard } from '../../src/models/loan';

export interface ISetTokens {
  setToken: Function;
}

export interface IFilter {
  setFilter: Function;
  filter: string;
}

export interface ILibraryProps {
  libraryId: string;
  books?: IBook[];
  setBooks?: Function;
}

export interface IAddBook {
  libraryId: string;
  newStatus: boolean;
  setSelectedBook: Function;
  setNewStatus: Function;
}

export interface ISelectBook {
  books: IBook[];
  setSelectedBook: Function;
}

export interface IBookProps {
  libraryId: string;
  selectedBook: IBook;
  removeBook: Function;
}

export interface IIdProps {
  selectedBookId: string;
  libraryId: string;
}

export interface INav {
  logout: Function;
}

export interface SingleNote {
  date: string;
  content: string;
}

export interface IUser extends mongoose.Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  library: string;
  authenticated: IAuthenticated;
}

export interface ILibrary extends mongoose.Document {
  _id: string;
  userId: string;
  books: Array<string>;
}

export interface IBook extends mongoose.Document{
  _id: string;
  title: string;
  author: string;
  isbn: string;
}

export interface ILoan extends mongoose.Document {
  bookId: string;
  libraryId: string;
  currentStatus: boolean;
  loans: LibraryCard[];
}


export interface INotes extends mongoose.Document {
  bookId: string;
  libraryId: string;
  notes: SingleNote[];
}

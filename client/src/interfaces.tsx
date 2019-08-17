import mongoose from 'mongoose';
import { IAuthenticated } from '../../src/models/user';

export interface ISetTokens {
  setToken: Function;
}

export interface ILibraryProps {
  libraryId?: string;
  books?: IBook[];
  setBooks?: Function;
}

export interface IAddBook {
  libraryId?: string;
  setSelectedBook: Function;
  setNewBook: Function;
}

export interface ISelectBook {
  books: IBook[];
  setSelectedBook: Function;
}

export interface IBookProps {
  selectedBook: IBook;
}

export interface IAuthor {
  name: string;
}

export interface INav {
  logout: Function;
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

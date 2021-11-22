import { createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Book } from '../models';
import { loadBooksComplete, createBookStart, updateBookComplete, deleteBookComplete } from './book-collection.actions';

const bookCollectionAdapter = createEntityAdapter<Book>({ selectId: itm => itm.isbn });
export const bookCollectionReducers = createReducer(
  bookCollectionAdapter.getInitialState(),
  on(createBookStart, (slice, { book }) => bookCollectionAdapter.addOne(book, slice)),
  on(loadBooksComplete, (slice, { books }) => bookCollectionAdapter.setAll(books, slice)),
  on(updateBookComplete, (slice, { book }) => bookCollectionAdapter.updateOne({ id: book.isbn, changes: book }, slice)),
  on(deleteBookComplete, (slice, { isbn }) => bookCollectionAdapter.removeOne(isbn, slice))
);

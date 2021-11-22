import { createReducer, on } from '@ngrx/store';
import { loadBooksComplete, createBookStart, updateBookComplete, deleteBookComplete } from './book-collection.actions';
import { BookCollectionSlice } from './book-collection.slice';

const initialState: BookCollectionSlice = {
  entities: []
};
export const bookCollectionReducers = createReducer(
  initialState,
  on(createBookStart, (slice, { book }) => ({ ...slice, entities: [...slice.entities, book] })),
  on(loadBooksComplete, (slice, { books }) => ({ ...slice, entities: books })),
  on(updateBookComplete, (slice, { book }) => ({
    ...slice,
    entities: slice.entities.map(b => (b.isbn === book.isbn ? book : b))
  })),
  on(deleteBookComplete, (slice, { isbn }) => ({
    ...slice,
    entities: slice.entities.filter(book => isbn !== book.isbn)
  }))
);

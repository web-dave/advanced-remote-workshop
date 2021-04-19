import { createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';
import { Book } from '../models';
import { addAllBooks, bookFeatureName } from './book-collection.actions';

export interface BookStoreState {
  books: Book[];
}
const initialState: BookStoreState = {
  books: []
};

export const getBooksSelector = createSelector(
  createFeatureSelector<BookStoreState>(bookFeatureName),
  data => data.books
);

export const getBookSelector = (isbn: string) =>
  createSelector(getBooksSelector, books => books.find(b => b.isbn === isbn));

export const bookReducer = createReducer(
  initialState,
  on(addAllBooks, (state, action) => {
    return {
      ...state,
      books: action.books
    };
  })
);

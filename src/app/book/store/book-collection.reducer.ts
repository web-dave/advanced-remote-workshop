import { createReducer, on } from '@ngrx/store';
import { Book } from '../models';
import { addAllBooks } from './book-collection.actions';

export interface BookStoreState {
  books: Book[];
}
const initialState: BookStoreState = {
  books: []
};

export const bookReducer = createReducer(
  initialState,
  on(addAllBooks, (state, action) => {
    return {
      ...state,
      books: action.books
    };
  })
);

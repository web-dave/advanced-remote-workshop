import { createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';
import { RouterReducerState, getSelectors } from '@ngrx/router-store';
import { Book } from '../models';
import { addAllBooks, bookFeatureName } from './book-collection.actions';

export const routerFeatureSelector = createFeatureSelector<RouterReducerState>('router');
export const { selectRouteParam } = getSelectors(routerFeatureSelector);

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

export const getBookSelector = createSelector(selectRouteParam('isbn'), getBooksSelector, (isbn, books) =>
  books.find(b => b.isbn === isbn)
);

export const bookReducer = createReducer(
  initialState,
  on(addAllBooks, (state, action) => {
    return {
      ...state,
      books: action.books
    };
  })
);

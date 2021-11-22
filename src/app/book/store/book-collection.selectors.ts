import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { bookCollectionAdapter, bookFeatureSelector } from './book.feature';

const routerDings = createFeatureSelector<RouterReducerState>('router');

export const bookCollectionSliceSelector = createSelector(bookFeatureSelector, slice => slice.bookCollection);
const { selectAll } = bookCollectionAdapter.getSelectors(bookCollectionSliceSelector);
export const bookCollectionSelector = selectAll;
export const getBookByIsbnSelector = createSelector(
  getSelectors(routerDings).selectRouteParam('isbn'),
  bookCollectionSelector,
  (isbn, books) => books.find(book => book.isbn === isbn)
);

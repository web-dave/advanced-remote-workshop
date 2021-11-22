import { createSelector } from '@ngrx/store';
import { bookCollectionAdapter, bookFeatureSelector } from './book.feature';

export const bookCollectionSliceSelector = createSelector(bookFeatureSelector, slice => slice.bookCollection);
const { selectAll } = bookCollectionAdapter.getSelectors(bookCollectionSliceSelector);
export const bookCollectionSelector = selectAll;
export const getBookByIsbnSelector = (isbn: string) =>
  createSelector(bookCollectionSelector, books => books.find(book => book.isbn === isbn));

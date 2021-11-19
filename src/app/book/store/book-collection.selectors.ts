import { createSelector } from '@ngrx/store';
import { bookFeatureSelector } from './book.feature';

export const bookCollectionSliceSelector = createSelector(bookFeatureSelector, slice => slice.bookCollection);
export const bookCollectionSelector = createSelector(bookCollectionSliceSelector, collection => collection.entities);
export const getBookByIsbnSelector = (isbn: string) =>
  createSelector(bookCollectionSelector, books => books.find(book => book.isbn === isbn));

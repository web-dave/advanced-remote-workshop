import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import { bookCollectionReducers } from './book-collection.reducer';
import { BookCollectionSlice } from './book-collection.slice';

export const bookFeature = 'book';

export interface Bookstate {
  bookCollection: BookCollectionSlice;
}

export const bookReducers: ActionReducerMap<Bookstate> = {
  bookCollection: bookCollectionReducers
};

export const bookFeatureSelector = createFeatureSelector<Bookstate>(bookFeature);

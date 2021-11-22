import { createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import { Book } from '../models';
import { bookCollectionReducers } from './book-collection.reducer';
import { BookCollectionSlice } from './book-collection.slice';

export const bookFeature = 'book';

export const bookCollectionAdapter = createEntityAdapter<Book>({ selectId: itm => itm.isbn });

export interface Bookstate {
  bookCollection: BookCollectionSlice;
}

export const bookReducers: ActionReducerMap<Bookstate> = {
  bookCollection: bookCollectionReducers
};

export const bookFeatureSelector = createFeatureSelector<Bookstate>(bookFeature);

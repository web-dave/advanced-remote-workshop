import { createFeatureSelector } from '@ngrx/store';
import { BookCollectionSlice } from './book-collection.slice';

export const bookFeature = 'book';

export const bookFeatureSelector = createFeatureSelector<{ bookCollection: BookCollectionSlice }>(bookFeature);

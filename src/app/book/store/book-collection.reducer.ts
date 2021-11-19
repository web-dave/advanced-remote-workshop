import { createReducer, on } from '@ngrx/store';
import { createBookStart } from './book-collection.actions';
import { BookCollectionSlice } from './book-collection.slice';

const initialState: BookCollectionSlice = {
  entities: []
};
export const bookCollectionReducers = createReducer(
  initialState,
  on(createBookStart, (slice, { book }) => ({ ...slice, entities: [...slice.entities, book] }))
);

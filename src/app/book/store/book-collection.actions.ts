import { createAction, props } from '@ngrx/store';
import { Book } from '../models/book';

export const bookFeatureName = 'bookShelf';

export enum BookActionTypes {
  ready = '[book] Feature loaded',
  create = '[book] Create Book Start',
  addAll = '[book] Add All Books'
}

export const createBookStart = createAction(BookActionTypes.create);
export const readyToLoadBooks = createAction(BookActionTypes.ready);

export const addAllBooks = createAction(BookActionTypes.addAll, props<{ books: Book[] }>());

// {
//     books: []
// }

// (state, action)=> {return {
//     ...state,
//     books:  action.books
// }}

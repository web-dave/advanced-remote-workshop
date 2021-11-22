import { createAction, props } from '@ngrx/store';
import { Book } from '../models';

export const createBookStart = createAction('[Book] Create Book Start', props<{ book: Book }>());
export const loadBooksStart = createAction('[Book] Load Book Start');
export const loadBooksComplete = createAction('[Book] Load Book Complete', props<{ books: Book[] }>());

export const updateBookComplete = createAction('[Book] Update Book Complete', props<{ book: Book }>());
export const deleteBookComplete = createAction('[Book] Delete Book Complete', props<{ isbn: string }>());

import { createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';
import { RouterReducerState, getSelectors } from '@ngrx/router-store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Book } from '../models';
import { addAllBooks, bookFeatureName } from './book-collection.actions';

export const routerFeatureSelector = createFeatureSelector<RouterReducerState>('router');
export const { selectRouteParam } = getSelectors(routerFeatureSelector);

export type IBookStoreState = EntityState<Book>;

export const booksAdapter = createEntityAdapter<Book>({ selectId: book => book.isbn });

const initialState: IBookStoreState = booksAdapter.getInitialState();

const { selectAll, selectEntities } = booksAdapter.getSelectors();

export const getBooksSelector = createSelector(createFeatureSelector<IBookStoreState>(bookFeatureName), selectAll);

export const getBookSelector = createSelector(selectRouteParam('isbn'), getBooksSelector, (isbn, books) =>
  books.find(b => b.isbn === isbn)
);

export const bookReducer = createReducer(
  initialState,
  on(addAllBooks, (state, action) => {
    return booksAdapter.setAll(action.books, state);
  })
);

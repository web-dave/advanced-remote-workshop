import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Book } from '../models';
import { bookFeatureName } from '../store/book-collection.actions';
import { IBookStoreState, getBooksSelector } from '../store/book-collection.reducer';

@Component({
  selector: 'ws-book-list',
  styleUrls: ['./book-list.component.scss'],
  templateUrl: 'book-list.component.html'
})
export class BookListComponent {
  books$: Observable<Book[]>;

  constructor(private store: Store<{ bookShelf: IBookStoreState }>) {
    this.books$ = this.store.select(getBooksSelector);
  }
}

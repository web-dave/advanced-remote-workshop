import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Book } from '../models';
import { bookFeatureName } from '../store/book-collection.actions';
import { BookStoreState } from '../store/book-collection.reducer';

@Component({
  selector: 'ws-book-list',
  styleUrls: ['./book-list.component.scss'],
  templateUrl: 'book-list.component.html'
})
export class BookListComponent {
  books$: Observable<Book[]>;

  constructor(private store: Store<{ bookShelf: BookStoreState }>) {
    this.books$ = this.store.select(state => state[bookFeatureName].books);
  }
}

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Book } from '../models';
import { bookCollectionSelector } from '../store/book-collection.selectors';

@Component({
  selector: 'ws-book-list',
  styleUrls: ['./book-list.component.scss'],
  templateUrl: 'book-list.component.html'
})
export class BookListComponent {
  books$: Observable<readonly Book[]>;

  constructor(private store: Store) {
    this.books$ = this.store.select(bookCollectionSelector);
  }
}

import { ThrowStmt } from '@angular/compiler';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookApiService } from './book-api.service';
import { addAllBooks, readyToLoadBooks } from './store/book-collection.actions';

@Component({
  selector: 'ws-book',
  templateUrl: './book.component.html'
})
export class BookComponent {
  constructor(private store: Store) {
    this.store.dispatch(readyToLoadBooks());
  }
}

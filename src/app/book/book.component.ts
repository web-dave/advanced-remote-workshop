import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookApiService } from './book-api.service';
import { addAllBooks } from './store/book-collection.actions';

@Component({
  selector: 'ws-book',
  templateUrl: './book.component.html'
})
export class BookComponent {
  constructor(private bookData: BookApiService, private store: Store) {
    this.bookData.getAll().subscribe(data => this.store.dispatch(addAllBooks({ books: data })));
  }
}

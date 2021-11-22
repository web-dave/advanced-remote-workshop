import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { Book, BookNa } from '../models';
import { updateBookComplete } from '../store/book-collection.actions';

@Component({
  selector: 'ws-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit, OnDestroy {
  sink = new Subscription();
  book: Book = new BookNa();

  constructor(private route: ActivatedRoute, private bookService: BookApiService, private store: Store) {}

  ngOnInit() {
    this.sink.add(
      this.route.params
        .pipe(switchMap(params => this.bookService.getByIsbn(params.isbn)))
        .subscribe(book => (this.book = book))
    );
  }

  ngOnDestroy() {
    this.sink.unsubscribe();
  }

  save() {
    this.sink.add(
      this.bookService
        .update(this.book.isbn, this.book)
        .subscribe(book => this.store.dispatch(updateBookComplete({ book })))
    );
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Book } from '../models';

@Injectable({ providedIn: 'root' })
export class StateService {
  // data
  private data: Book[] = [];
  private data$$ = new BehaviorSubject<Book[]>(this.data);
  //getData
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public data$: Observable<Book[]> = this.data$$.asObservable();

  getBookByIsbn(isbn: string): Observable<Book> {
    return this.data$.pipe(
      map(books => books.find(book => book.isbn === isbn)),
      filter((b): b is Book => !!b)
    );
  }

  //setAll
  setAll(books: Book[]): void {
    this.data = books;
    this.data$$.next(this.data);
  }

  // Update
  uppdateOne(update: Book) {
    this.data = this.data.map(book => (book.isbn === update.isbn ? update : book));
    this.data$$.next(this.data);
  }

  // add
  addOne(book: Book): void {
    this.data.push(book);
    this.data$$.next(this.data);
  }

  // delete
  deleteOne(isbn: string) {
    this.data = this.data.filter(book => book.isbn !== isbn);
    this.data$$.next(this.data);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, scan, tap } from 'rxjs/operators';
import { Book } from '../models';

export const ADDALL = '[Book] Add All';
export const ADDONE = '[Book] Add One';
export const UPDATEONE = '[Book] Update One';
export const DELETEONE = '[Book] Delete One';

export class AddAll {
  readonly type = ADDALL;
  constructor(public books: Book[]) {}
}

export class AddOne {
  readonly type = ADDONE;
  constructor(public book: Book) {}
}

export class UpdateOne {
  readonly type = UPDATEONE;
  constructor(public book: Book) {}
}

export class DeleteOne {
  readonly type = DELETEONE;
  constructor(public isbn: string) {}
}

export type BookActions = AddAll | AddOne | UpdateOne | DeleteOne;

@Injectable({ providedIn: 'root' })
export class ScanStoreService {
  // data
  private data$$ = new BehaviorSubject<Book[]>([]);
  private actions$ = new Subject<BookActions>();
  constructor() {
    this.actions$
      .pipe(
        scan((state, action) => {
          switch (action.type) {
            case ADDALL:
              return this.setAll(action.books, state);
            case ADDONE:
              return this.addOne(action.book, state);
            case UPDATEONE:
              return this.uppdateOne(action.book, state);
            case DELETEONE:
              return this.deleteOne(action.isbn, state);
            default:
              return state;
          }
        }, this.data$$.value)
      )
      .subscribe(books => this.data$$.next(books));
  }

  public select(selector: (state: Book[]) => any = books => books) {
    return this.data$$.pipe(
      map(selector),
      tap(data => console.log(data))
    );
  }

  dispatch(action: BookActions) {
    this.actions$.next(action);
  }

  //setAll
  private setAll(books: Book[], list: Book[]): Book[] {
    return books;
  }

  // Update
  private uppdateOne(update: Book, list: Book[]) {
    return list.map(book => (book.isbn === update.isbn ? update : book));
  }

  // add
  private addOne(book: Book, list: Book[]): Book[] {
    return [...list, book];
  }

  // delete
  private deleteOne(isbn: string, list: Book[]) {
    return list.filter(book => book.isbn !== isbn);
  }
}

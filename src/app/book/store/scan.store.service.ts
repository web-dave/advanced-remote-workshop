import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, scan, share, tap } from 'rxjs/operators';
import { Book } from '../models';

export type BookActionTypes = '[Book] Add All' | '[Book] Add One' | '[Book] Update One' | '[Book] Delete One';

export class AddAll {
  readonly type = '[Book] Add All';
  constructor(public books: Book[]) {}
}

export class AddOne {
  readonly type = '[Book] Add One';
  constructor(public book: Book) {}
}

export class UpdateOne {
  readonly type = '[Book] Update One';
  constructor(public book: Book) {}
}

export class DeleteOne {
  readonly type = '[Book] Delete One';
  constructor(public isbn: string) {}
}

export type BookActions = AddAll | AddOne | UpdateOne | DeleteOne;

@Injectable({ providedIn: 'root' })
export class ScanStoreService {
  private actions$ = new Subject<BookActions>();
  // data
  private data: Book[] = [];

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public select(selector: (state: Book[]) => any = books => books) {
    return this.actions$.pipe(
      scan((state, action) => {
        switch (action.type) {
          case '[Book] Add All':
            return this.setAll(action.books, state);
          case '[Book] Add One':
            return this.addOne(action.book, state);
          case '[Book] Update One':
            return this.uppdateOne(action.book, state);
          case '[Book] Delete One':
            return this.deleteOne(action.isbn, state);
          default:
            return state;
        }
      }, this.data),
      map(selector),
      share()
    );
  }

  dispatch(action: BookActions) {
    this.actions$.next(action);
  }

  //setAll
  private setAll(books: Book[], list: Book[]): Book[] {
    list = books;
    return list;
  }

  // Update
  private uppdateOne(update: Book, list: Book[]) {
    list = list.map(book => (book.isbn === update.isbn ? update : book));
    return list;
  }

  // add
  private addOne(book: Book, list: Book[]): Book[] {
    list.push(book);
    return list;
  }

  // delete
  private deleteOne(isbn: string, list: Book[]) {
    list = list.filter(book => book.isbn !== isbn);
    return list;
  }
}

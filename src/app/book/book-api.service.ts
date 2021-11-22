import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { Book } from './models';
import { AddAll, AddOne, DeleteOne, ScanStoreService, UpdateOne } from './store/scan.store.service';

@Injectable({ providedIn: 'root' })
export class BookApiService implements OnDestroy {
  kill = false;
  private endpoint = 'http://localhost:4730/books';
  constructor(private http: HttpClient, private store: ScanStoreService) {}

  getAll(): void {
    this.http
      .get<Book[]>(`${this.endpoint}`)
      .pipe(takeWhile(() => !this.kill))
      .subscribe(books => this.store.dispatch(new AddAll(books)));
  }

  getByIsbn(isbn: string): Observable<Book> {
    return this.store.select(books => books.find(book => book.isbn === isbn) as Book);
  }

  create(book: Book): void {
    this.http
      .post<Book>(`${this.endpoint}`, book)
      .pipe(takeWhile(() => !this.kill))
      .subscribe(data => this.store.dispatch(new AddOne(data)));
  }

  update(isbn: string, patch: Partial<Book>): void {
    this.http
      .patch<Book>(`${this.endpoint}/${isbn}`, patch)
      .pipe(takeWhile(() => !this.kill))
      .subscribe(book => this.store.dispatch(new UpdateOne(book)));
  }

  delete(isbn: string): void {
    this.http
      .delete<Book>(`${this.endpoint}/${isbn}`)
      .pipe(takeWhile(() => !this.kill))
      .subscribe(() => this.store.dispatch(new DeleteOne(isbn)));
  }
  ngOnDestroy() {
    this.kill = true;
  }
}

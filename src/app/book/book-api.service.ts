import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { Book } from './models';
import { StateService } from './store/state.service';

@Injectable({ providedIn: 'root' })
export class BookApiService implements OnDestroy {
  kill = false;
  private endpoint = 'http://localhost:4730/books';
  constructor(private http: HttpClient, private state: StateService) {}

  getAll(): void {
    this.http
      .get<Book[]>(`${this.endpoint}`)
      .pipe(takeWhile(() => !this.kill))
      .subscribe(books => this.state.setAll(books));
  }

  getByIsbn(isbn: string): Observable<Book> {
    return this.state.getBookByIsbn(isbn);
  }

  create(book: Book): void {
    this.http
      .post<Book>(`${this.endpoint}`, book)
      .pipe(takeWhile(() => !this.kill))
      .subscribe(data => this.state.addOne(data));
  }

  update(isbn: string, patch: Partial<Book>): void {
    this.http
      .patch<Book>(`${this.endpoint}/${isbn}`, patch)
      .pipe(takeWhile(() => !this.kill))
      .subscribe(book => this.state.uppdateOne(book));
  }

  delete(isbn: string): void {
    this.http
      .delete<Book>(`${this.endpoint}/${isbn}`)
      .pipe(takeWhile(() => !this.kill))
      .subscribe(() => this.state.deleteOne(isbn));
  }
  ngOnDestroy() {
    this.kill = true;
  }
}

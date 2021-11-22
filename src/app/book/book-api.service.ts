import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { Book } from './models';

@Injectable({ providedIn: 'root' })
export class BookApiService implements OnDestroy {
  kill = false;
  private endpoint = 'http://localhost:4730/books';
  constructor(private http: HttpClient) {}

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.endpoint}`).pipe(takeWhile(() => !this.kill));
  }

  getByIsbn(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${this.endpoint}/${isbn}`).pipe(takeWhile(() => !this.kill));
  }

  create(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.endpoint}`, book).pipe(takeWhile(() => !this.kill));
  }

  update(isbn: string, patch: Partial<Book>): Observable<Book> {
    return this.http.patch<Book>(`${this.endpoint}/${isbn}`, patch).pipe(takeWhile(() => !this.kill));
  }

  delete(isbn: string): Observable<Book> {
    return this.http.delete<Book>(`${this.endpoint}/${isbn}`).pipe(takeWhile(() => !this.kill));
  }
  ngOnDestroy() {
    this.kill = true;
  }
}

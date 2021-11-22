import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BookApiService } from '../book-api.service';
import { Book } from '../models';

@Component({
  selector: 'ws-book-detail',
  styleUrls: ['./book-detail.component.scss'],
  templateUrl: 'book-detail.component.html'
})
export class BookDetailComponent {
  public book$: Observable<Book>;

  constructor(private router: Router, private route: ActivatedRoute, private bookService: BookApiService) {
    this.book$ = this.bookService.getByIsbn(this.route.snapshot.params.isbn);
  }

  remove() {
    this.bookService.delete(this.route.snapshot.params.isbn);
    this.router.navigateByUrl('/');
  }
}

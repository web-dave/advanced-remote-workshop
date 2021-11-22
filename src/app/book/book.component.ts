import { Component } from '@angular/core';
import { BookApiService } from './book-api.service';

@Component({
  selector: 'ws-book',
  templateUrl: './book.component.html'
})
export class BookComponent {
  constructor(private api: BookApiService) {
    this.api.getAll();
  }
}

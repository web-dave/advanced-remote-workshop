import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models';
import { StateService } from '../store/state.service';

@Component({
  selector: 'ws-book-list',
  styleUrls: ['./book-list.component.scss'],
  templateUrl: 'book-list.component.html'
})
export class BookListComponent {
  books$: Observable<readonly Book[]>;

  constructor(private state: StateService) {
    this.books$ = this.state.data$;
  }
}

import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models';
import { ScanStoreService } from '../store/scan.store.service';
import { StateService } from '../store/state.service';

@Component({
  selector: 'ws-book-list',
  styleUrls: ['./book-list.component.scss'],
  templateUrl: 'book-list.component.html'
})
export class BookListComponent {
  books$: Observable<readonly Book[]>;

  constructor(private store: ScanStoreService) {
    this.books$ = this.store.select();
  }
}

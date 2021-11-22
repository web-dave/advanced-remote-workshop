import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookApiService } from '../book-api.service';
import { BookNa } from '../models';

@Component({
  selector: 'ws-book-new',
  styleUrls: ['./book-new.component.scss'],
  templateUrl: './book-new.component.html'
})
export class BookNewComponent implements OnDestroy {
  sink = new Subscription();
  form: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private bookService: BookApiService) {
    this.form = this.buildForm();
  }

  ngOnDestroy() {
    this.sink.unsubscribe();
  }

  create() {
    const book = { ...new BookNa(), ...this.form.value };
    this.bookService.create(book);
    this.router.navigateByUrl('/');
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      isbn: ['', [Validators.required, Validators.minLength(3)]],
      title: ['', Validators.required],
      author: ['', Validators.required],
      cover: ['']
    });
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookApiService } from '../book-api.service';
import { BookNa } from '../models';
import { asyncAuthorValidator, syncAuthorValidator } from './author.validator';

@Component({
  selector: 'ws-book-new',
  styleUrls: ['./book-new.component.scss'],
  templateUrl: './book-new.component.html'
})
export class BookNewComponent implements OnDestroy, OnInit {
  sink = new Subscription();
  form: FormGroup;

  get authors(): FormArray {
    return this.form.controls.authors as FormArray;
  }

  constructor(private router: Router, private fb: FormBuilder, private bookService: BookApiService) {
    this.form = this.buildForm();
    this.addAuthor();
  }

  ngOnInit() {
    this.authors.valueChanges.subscribe(authors =>
      this.form.controls.author.setValue(authors.map((authorform: { author: string }) => authorform.author).join(', '))
    );
  }

  ngOnDestroy() {
    this.sink.unsubscribe();
  }

  create() {
    const book = { ...new BookNa(), ...this.form.value };
    delete book.authors;
    this.bookService.create(book);
    this.router.navigateByUrl('/');
  }
  addAuthor() {
    const authorForm = this.fb.group({
      author: ['', [Validators.required, syncAuthorValidator], [asyncAuthorValidator()]]
    });
    authorForm.get('author')?.getError('author');
    this.authors.push(authorForm);
  }

  deleteAuthor(index: number) {
    this.authors.removeAt(index);
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      isbn: ['', [Validators.required, Validators.minLength(3)]],
      title: ['', Validators.required],
      author: ['', Validators.required],
      authors: this.fb.array([]),
      cover: ['']
    });
  }
}

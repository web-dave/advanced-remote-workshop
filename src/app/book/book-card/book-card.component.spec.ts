import { Book, BookNa } from '../models';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { BookCardComponent } from './book-card.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('BookCardComponent', () => {
  let spectator: Spectator<BookCardComponent>;

  const createComponent = createComponentFactory({
    component: BookCardComponent,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [RouterTestingModule]
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });

  describe('When no content is passed', () => {
    it('defaults to "n/a"', () => {
      expect(spectator.query('mat-card-title')).toContainText('n/a');
    });
  });
  describe('display title', () => {
    it('in template', () => {
      const book: Book = { ...new BookNa(), title: 'How to make cake.' };
      spectator.setInput({ content: book });
      expect(spectator.query('mat-card-title')).toContainText('How to make cake');
    });
  });
});

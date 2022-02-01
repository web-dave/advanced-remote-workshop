import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BookNa } from '../models';

import { BookCardComponent } from './book-card.component';

describe('BookCardComponent', () => {
  let component: BookCardComponent;
  let fixture: ComponentFixture<BookCardComponent>;
  let view: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    view = fixture.debugElement.nativeElement; //document.querySelector('ws-book-card')
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When no content is passed', () => {
    it('defaults to "n/a"', () => {
      expect(component.content).toEqual(new BookNa());
    });
  });
  describe('display title', () => {
    it('in template', () => {
      component.content.title = 'How to make cake';
      fixture.detectChanges();
      expect(view.querySelector('mat-card-title')?.innerHTML).toBe('How to make cake');
    });
  });
});

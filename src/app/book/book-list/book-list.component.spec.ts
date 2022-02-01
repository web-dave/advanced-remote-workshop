import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { BookApiService } from '../book-api.service';
import { BookNa } from '../models';
import { BookListComponent } from './book-list.component';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let view: HTMLElement;
  const bookApiMock = jasmine.createSpyObj<BookApiService>(['getAll', 'getByIsbn']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookListComponent],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: BookApiService,
          useValue: bookApiMock
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    bookApiMock.getAll.and.returnValue(of([new BookNa()]));
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    view = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('spy has been called and book is available', done => {
    expect(bookApiMock.getAll).toHaveBeenCalled();
    expect(view.querySelector('ws-book-card')).toBeTruthy();
    done();
  });
});

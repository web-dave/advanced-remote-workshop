import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookApiService } from './book-api.service';
import { BookNa } from './models';

describe('BookApiService', () => {
  const books = [new BookNa()];
  let httpMock: HttpTestingController;
  let api: BookApiService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookApiService]
    });
    httpMock = TestBed.inject(HttpTestingController);
    api = TestBed.inject(BookApiService);
  });

  afterEach(() => httpMock.verify());

  //   1.a
  it('should recive Data (donFn)', done => {
    api.getAll().subscribe(data => {
      expect(data).toEqual(books);
      done();
    });
    httpMock.expectOne('http://localhost:4730/books').flush(books);
  });

  //   1.b
  it('should recive Data (async/await)', async () => {
    const books$ = api.getAll().toPromise();
    httpMock.expectOne('http://localhost:4730/books').flush(books);
    await expectAsync(books$).toBeResolvedTo(books);
  });

  //   2.
  it('should recive NetWorkError', async () => {
    const books$ = api.getAll().toPromise();
    httpMock.expectOne('http://localhost:4730/books').error(new ErrorEvent('Network error.'));
    await expectAsync(books$).toBeRejectedWithError('Sorry, we have connectivity issues.');
  });

  //   3.
  it('should recive 500', async () => {
    const books$ = api.getAll().toPromise();
    httpMock.expectOne('http://localhost:4730/books').flush('No books', { status: 500, statusText: 'The API hung up' });
    await expectAsync(books$).toBeRejectedWithError('Sorry, we could not load any books');
  });
});

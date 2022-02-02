import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { createHttpFactory, SpectatorHttp, HttpMethod } from '@ngneat/spectator';
import { BookApiService } from './book-api.service';
import { BookNa } from './models';

describe('BookApiService', () => {
  const books = [new BookNa()];
  let spectator: SpectatorHttp<BookApiService>;
  const createHttp = createHttpFactory(BookApiService);
  beforeEach(() => (spectator = createHttp()));
  //   1.a
  it('should recive Data (donFn)', done => {
    spectator.service.getAll().subscribe(data => {
      expect(data).toEqual(books);
      done();
    });
    spectator.expectOne('http://localhost:4730/books', HttpMethod.GET).flush(books);
  });

  //   1.b
  it('should recive Data (async/await)', async () => {
    const books$ = spectator.service.getAll().toPromise();
    spectator.expectOne('http://localhost:4730/books', HttpMethod.GET).flush(books);
    await expectAsync(books$).toBeResolvedTo(books);
  });

  //   2.
  it('should recive NetWorkError', async () => {
    const books$ = spectator.service.getAll().toPromise();
    spectator.expectOne('http://localhost:4730/books', HttpMethod.GET).error(new ErrorEvent('Network error.'));
    await expectAsync(books$).toBeRejectedWithError('Sorry, we have connectivity issues.');
  });

  //   3.
  it('should recive 500', async () => {
    const books$ = spectator.service.getAll().toPromise();
    spectator
      .expectOne('http://localhost:4730/books', HttpMethod.GET)
      .flush('No books', { status: 500, statusText: 'The API hung up' });
    await expectAsync(books$).toBeRejectedWithError('Sorry, we could not load any books');
  });
});

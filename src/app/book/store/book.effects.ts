import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, map, exhaustMap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { addAllBooks, BookActionTypes } from './book-collection.actions';

@Injectable()
export class BookEffects {
  bookFeatureLoaded = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActionTypes.ready),
      exhaustMap(() => this.service.getAll()),
      map(data => addAllBooks({ books: data }))
    )
  );
  //   bookFeatureLoaded2 = createEffect(
  //     () =>
  //       this.actions$.pipe(
  //         ofType(BookActionTypes.ready),
  //         tap(() => this.service.getAllBooksForStore())
  //       ),
  //     { dispatch: false }
  //   );
  constructor(private actions$: Actions, private service: BookApiService) {}
}

import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export const syncAuthorValidator: ValidatorFn = (control: AbstractControl): ValidationErrors => {
  return /^[A-Z].*/.test(control.value) ? {} : { author: 'Muss mit einem GROßBUCHSTABEN beginnen!' };
};

export const asyncAuthorValidator = (): AsyncValidatorFn => {
  return (control: AbstractControl): Observable<ValidationErrors> =>
    of(/^[A-Z].*/.test(control.value)).pipe(
      delay(2000),
      map(result => (result ? {} : { author: 'ASYNC Muss mit einem GROßBUCHSTABEN beginnen!' }))
    );
};

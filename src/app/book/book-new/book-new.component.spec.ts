import { BookNewComponent } from './book-new.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BookApiService } from '../book-api.service';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

const bookApiMock = jasmine.createSpyObj<BookApiService>(['create']);
describe('BookNewComponent', () => {
  const inputSelector = '[data-test=isbn-field] input';
  let spectator: Spectator<BookNewComponent>;

  const createComponent = createComponentFactory({
    component: BookNewComponent,
    imports: [
      NoopAnimationsModule,
      ReactiveFormsModule,
      RouterTestingModule,
      MatButtonModule,
      MatInputModule,
      MatFormFieldModule
    ],
    providers: [
      {
        provide: BookApiService,
        useValue: bookApiMock
      }
    ]
  });
  beforeEach(() => (spectator = createComponent()));

  it('should show error if less than 3 chars', async () => {
    spectator.typeInElement('08', inputSelector);
    spectator.blur(inputSelector);
    expect(spectator.query('mat-error')).toContainText('ISBN has to be at least 3 chars long.');
  });

  it('should show error if no value', async () => {
    spectator.typeInElement('', inputSelector);
    spectator.blur(inputSelector);
    expect(spectator.query('mat-error')).toContainText('ISBN is required');
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookNewComponent } from './book-new.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { BookApiService } from '../book-api.service';
import { MatInputHarness } from '@angular/material/input/testing';

const bookApiMock = jasmine.createSpyObj<BookApiService>(['create']);
describe('BookNewComponent', () => {
  let fixture: ComponentFixture<BookNewComponent>;
  let loader: HarnessLoader;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookNewComponent],
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

    fixture = TestBed.createComponent(BookNewComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);

    fixture.detectChanges();
  });

  it('should show error if less than 3 chars', async () => {
    const isbnFormField = await loader.getHarness(MatFormFieldHarness.with({ selector: '[data-test="isbn-field"]' }));
    const isbnInput = (await isbnFormField.getControl()) as MatInputHarness;
    await isbnInput.setValue('08');
    await isbnInput.blur();
    const errorMsg = await isbnFormField.getTextErrors();

    expect(errorMsg).toContain('ISBN has to be at least 3 chars long.');
  });

  it('should show error if no value', async () => {
    const isbnFormField = await loader.getHarness(MatFormFieldHarness.with({ selector: '[data-test="isbn-field"]' }));
    const isbnInput = (await isbnFormField.getControl()) as MatInputHarness;
    await isbnInput.setValue('');
    await isbnInput.blur();
    const errorMsg = await isbnFormField.getTextErrors();

    expect(errorMsg).toContain('ISBN is required');
  });
});

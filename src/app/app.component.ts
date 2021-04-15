import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'ws-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private translocoService: TranslocoService) {
    translocoService.setActiveLang('en');
  }
}

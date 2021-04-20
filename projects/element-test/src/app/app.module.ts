import { Injector, NgModule, DoBootstrap, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import { MoinComponent } from './moin/moin.component';

@NgModule({
  declarations: [MoinComponent],
  imports: [BrowserModule]
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {
    const myComp = createCustomElement(MoinComponent, { injector });
    customElements.define('moin-moin', myComp);
  }
  ngDoBootstrap(): void {}
}

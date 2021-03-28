import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdCarousel } from './carousel';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdCarousel],
  exports: [NgbdCarousel],
  bootstrap: [NgbdCarousel]
})
export class NgbdCarouselModule {}
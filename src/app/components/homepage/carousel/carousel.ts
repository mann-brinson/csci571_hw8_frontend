import { Component } from '@angular/core';

@Component(
  {selector: 'ngbd-carousel', 
  templateUrl: './carousel.html'})
  
export class NgbdCarousel {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
}
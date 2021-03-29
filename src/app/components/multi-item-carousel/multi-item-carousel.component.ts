import { Component, Input, OnInit } from '@angular/core';
import { MovieTvItem } from 'src/app/components/homepage/movieTvItem';
import { HomepageComponent } from 'src/app/components/homepage/homepage.component';

@Component({
  selector: 'app-multi-item-carousel',
  templateUrl: './multi-item-carousel.component.html',
  styleUrls: ['./multi-item-carousel.component.css']
})
export class MultiItemCarouselComponent {
  // @Input() movies_popular:MovieTvItem[] = [];
  @Input() movies_list_raw:MovieTvItem[] = [];

  slides: any = [[]];

  constructor(private homepageComponent: HomepageComponent) { }

  //Must wait until the homepage projects its data into this view
  // ngOnChanges() {
  //   if (this.movies_popular.length != 0) {
  //     console.log('movies_popular available');

  //     var chunkSize = 6;
  //     let R = [];
  //     for (let i = 0, len = this.movies_popular.length; i < len; i += chunkSize) {
  //       R.push(this.movies_popular.slice(i, i + chunkSize));
  //     }
  //     this.slides = R;
  //   }
  // }

  ngOnChanges() {
    if (this.movies_list_raw.length != 0) {
      console.log('movies_popular available');

      var chunkSize = 6;
      let R = [];
      for (let i = 0, len = this.movies_list_raw.length; i < len; i += chunkSize) {
        R.push(this.movies_list_raw.slice(i, i + chunkSize));
      }
      this.slides = R;
    }
  }
}
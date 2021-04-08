import { Component, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MovieTvItem } from 'src/app/components/homepage/movieTvItem';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

// An enum that define all screen sizes the application support
export enum SCREEN_SIZE {
  XS,
  SM,
  MD,
  LG,
  XL
}

@Component({
  selector: 'app-multi-item-carousel',
  templateUrl: './multi-item-carousel.component.html',
  styleUrls: ['./multi-item-carousel.component.css']
})
export class MultiItemCarouselComponent {
  @Input() movies_list_raw:MovieTvItem[] = []
  @Input() primary_page_yn: boolean = true

  public slides: any = [[]];
  public screenWidth: number = 0
  public card_class = "card-moviepage"
  public card_img_class = "card-img-overlay-moviepage"

  public small_screen_yn: boolean = false

  constructor(
    private router: Router,
    private element: ElementRef,
    private breakpointObserver: BreakpointObserver) { }

  //Must wait until the homepage projects its data into this view
  ngOnChanges() {

    // Check if screen is smartphone
    // ASSUME: if screen is <500px that the device is smartphone
    this.breakpointObserver
    .observe(['(min-width: 500px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        // console.log('Viewport is 500px or over!')
        this.small_screen_yn = false

      } else {
        // console.log('Viewport is smaller than 500px!')
        this.small_screen_yn = true
      }
    });

    if (this.movies_list_raw.length != 0) {
      // Get the client current width
      this.screenWidth = window.innerWidth
      
      // Assign a chunk size based on client's current width
      var chunkSize = 1
      if (this.screenWidth > 0 && this.screenWidth <= 650) {
        chunkSize = 1
      } else if (this.screenWidth > 650 && this.screenWidth <= 900) {
        chunkSize = 2
      } else if (this.screenWidth > 900 && this.screenWidth <= 1150) {
        chunkSize = 3
      } else if (this.screenWidth > 1150 && this.screenWidth <= 1400) {
        chunkSize = 4
      } else if (this.screenWidth > 1400) {
        chunkSize = 6
      }

      // Chunk the slides according to the client's curent width
      let R = [];
      for (let i = 0, len = this.movies_list_raw.length; i < len; i += chunkSize) {
        R.push(this.movies_list_raw.slice(i, i + chunkSize));
      }
      this.slides = R;
    }
  }

  gotoMovieTvPage(event: Event) {
    let entityType_movieId: string = (event.target as Element).id
    var entity_type = entityType_movieId.split('-')[0]
    var movie_id = entityType_movieId.split('-')[1]

    // console.log({"going to ": [entity_type, movie_id]})
    this.router.navigate([`/watch/${entity_type}/${movie_id}`])
  }
}
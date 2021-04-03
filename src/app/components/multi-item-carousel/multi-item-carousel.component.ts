import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MovieTvItem } from 'src/app/components/homepage/movieTvItem';

@Component({
  selector: 'app-multi-item-carousel',
  templateUrl: './multi-item-carousel.component.html',
  styleUrls: ['./multi-item-carousel.component.css']
})
export class MultiItemCarouselComponent {
  // @Input() movies_popular:MovieTvItem[] = [];
  @Input() movies_list_raw:MovieTvItem[] = []


  slides: any = [[]];

  constructor(private router: Router) { }

  //Must wait until the homepage projects its data into this view
  ngOnChanges() {
    if (this.movies_list_raw.length != 0) {
      // console.log('trigger');
      // console.log(this.entity_type);

      var chunkSize = 6;
      let R = [];
      for (let i = 0, len = this.movies_list_raw.length; i < len; i += chunkSize) {
        R.push(this.movies_list_raw.slice(i, i + chunkSize));
      }
      this.slides = R;
    }
  }

  gotoMovieTvPage(event: Event) {
    console.log(event.target);
    // let movie_id: string = (event.target as Element).id
    let entityType_movieId: string = (event.target as Element).id
    var entity_type = entityType_movieId.split('-')[0]
    var movie_id = entityType_movieId.split('-')[1]

    console.log({"going to ": [entity_type, movie_id]})
    // console.log(`/watch/${entity_type}/${movie_id}`)
    this.router.navigate([`/watch/${entity_type}/${movie_id}`])
  }
}
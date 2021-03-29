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
  @Input() movies_list_raw:MovieTvItem[] = [];
  @Input() entity_type:string = "";

  slides: any = [[]];

  constructor(private router: Router) { }

  //Must wait until the homepage projects its data into this view
  ngOnChanges() {
    if (this.movies_list_raw.length != 0) {
      // console.log('movies_popular available');
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
    // console.log(event.target);
    let movie_id: string = (event.target as Element).id;
    console.log(movie_id);
    console.log(this.entity_type);
    console.log(`/watch/${this.entity_type}/${movie_id}`)
    this.router.navigate([`/watch/${this.entity_type}/${movie_id}`]);
  }
}
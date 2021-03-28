import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HomepageService } from './homepage.service';
import { MovieTvItem } from './movieTvItem';

// import { NgbdCarouselModule } from 'components/bootstrap/carousel/carousel.module';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  holder = {};
  // movies = [];
  movies: MovieTvItem[] = [];
  // movies: MovieTvItem[];

  constructor(private homepageService: HomepageService,
    private router: Router) { }

  ngOnInit() {
    this.homepageService.getHomepage()
      .subscribe((data) => {
        // console.log(data.head.now_playing[0].id);
        console.log(data.head.now_playing);
        this.holder = data;
        this.movies = data.head.now_playing;

        // head_movies = data.head
      })  
  }

  // ATTEMPT 2
  testFx(event: Event) {
    // console.log(event);
    let movie_id: string = (event.target as Element).id;
    // var movie_id = srcElem.id
    console.log(movie_id);
    this.router.navigate([`/watch/movie/${movie_id}`]);
  }


}


import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HomepageService } from './homepage.service';

import { MovieItem } from './movieItem';
import { MovieTvItem } from './movieTvItem';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  holder = {};
  movies_now_playing: MovieItem[] = [];
  movies_popular: MovieTvItem[] = [];

  constructor(private homepageService: HomepageService,
    private router: Router) { }

  ngOnInit() {
    this.homepageService.getHomepage()
      .subscribe((data) => {
        // console.log(data.head.now_playing[0].id);
        console.log(data.movie);

        this.holder = data;
        this.movies_now_playing = data.head.now_playing;
        this.movies_popular = data.movie[0].popular;

        // head_movies = data.head
      })  
  }

  gotoMoviePage(event: Event) {
    let movie_id: string = (event.target as Element).id;
    this.router.navigate([`/watch/movie/${movie_id}`]);
  }


}


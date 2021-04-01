import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage/local-storage.service';
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
  public movies_now_playing: MovieItem[] = [];
  public movies_popular: MovieTvItem[] = [];
  public movies_top_rated: MovieTvItem[] = [];
  public movies_trending: MovieTvItem[] = [];

  public tv_popular: MovieTvItem[] = [];
  public tv_top_rated: MovieTvItem[] = [];
  public tv_trending: MovieTvItem[] = [];

  public lru_not_empty = false
  public continue_watching: MovieTvItem[] = []

  slides: any = [[]];

  constructor(
    private homepageService: HomepageService,
    private router: Router,
    private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.homepageService.getHomepage()
      .subscribe((data) => {
        // console.log(data.head.now_playing[0].id);
        // console.log(data.movie);

        this.holder = data;
        this.movies_now_playing = data.head.now_playing;
        this.movies_popular = data.movie[0].popular;
        this.movies_top_rated = data.movie[1].top_rated;
        this.movies_trending = data.movie[2].trending;

        this.tv_popular = data.tv[0].popular;
        this.tv_top_rated = data.tv[1].top_rated;
        this.tv_trending = data.tv[2].trending;

        if ("lru_cache" in this.localStorageService.localStorage) {
          this.lru_not_empty = true
          this.continue_watching = this.localStorageService.localStorage["lru_cache"]
        }
        console.log({"local storage": this.localStorageService.localStorage})
      })  
  }

  gotoMoviePage(event: Event) {
    let entityType_movieId: string = (event.target as Element).id
    var entity_type = entityType_movieId.split("-")[0]
    var movie_id = entityType_movieId.split("-")[1]
    
    console.log({"going to ": [entity_type, movie_id]})
    this.router.navigate([`/watch/${entity_type}/${movie_id}`])
  }



}


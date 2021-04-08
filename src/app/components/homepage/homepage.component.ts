import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { HomepageService } from './homepage.service';

import { MovieItem } from './movieItem';
import { MovieTvItem } from './movieTvItem';

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
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

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

  public small_screen_yn: boolean = false

  slides: any = [[]]

  constructor(
    private homepageService: HomepageService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private breakpointObserver: BreakpointObserver
    ) { }

  ngOnInit() {

    // Check if screen is smartphone
    // ASSUME: if screen is <500px that the device is smartphone
    this.breakpointObserver
    .observe(['(min-width: 500px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        console.log('Viewport is 500px or over!')
        this.small_screen_yn = false
      } else {
        console.log('Viewport is smaller than 500px!')
        this.small_screen_yn = true
      }
    });

    this.homepageService.getHomepage()
      .subscribe((data) => {

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
          this.continue_watching = JSON.parse(this.localStorageService.localStorage["lru_cache"])
        }
      })  
  }

  gotoMoviePage(event: Event) {
    let entityType_movieId: string = (event.target as Element).id
    var entity_type = entityType_movieId.split("-")[0]
    var movie_id = entityType_movieId.split("-")[1]

    // console.log({"going to ": [entity_type, movie_id]})
    this.router.navigate([`/watch/${entity_type}/${movie_id}`])
  }

}




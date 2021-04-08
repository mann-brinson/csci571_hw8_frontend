import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { LocalStorageService } from 'src/app/components/local-storage/local-storage.service';
import { MovieTvItem } from 'src/app/components/homepage/movieTvItem';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.css']
})
export class MylistComponent {
  lru_cache: any
  watchlist: any
  len_localStorage: number = 0;
  localStorage_not_empty: boolean = false;
  localStorage_items: any = [];

  lruCache_empty_yn: boolean = true
  watchlist_empty_yn: boolean = true

  lruCache_json: object = {}
  watchlist_json: MovieTvItem[] = []

  public small_screen_yn: boolean = false

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private breakpointObserver: BreakpointObserver) { }
 
  ngOnInit() {
    // Check localstorage and set variables
    this.lru_cache = this.localStorageService.localStorage["lru_cache"]
    this.watchlist = this.localStorageService.localStorage["watchlist"]
    this.len_localStorage = this.localStorageService.localStorage.length

    //// JSON-TO-INTERFACE HELPERS
    function adapt(mapper: any, json: any) {
      let adaptedObj: any = {}
      const fields: Array<string> = Object.keys(mapper)
      for (let field of fields) {
        const targetField: any = mapper[field]
        adaptedObj[targetField] = json[field]
      }
      return adaptedObj
    }

    function JSONtoMovieTvItemMapper(json: any): MovieTvItem {
      const mapper = {
        'id': 'id',
        'name': 'name',
        'poster_path': 'poster_path',
        'entity_type': 'entity_type'
      }
      return adapt(mapper, json)
    }

    //// DRIVER

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

    // CONTINUE WATCHING EXISTS
    if (this.lru_cache != undefined) {
      this.lruCache_empty_yn = false
      this.lruCache_json = JSON.parse(this.lru_cache)
    }

    // WATCHLIST EXISTS
    if (this.watchlist != undefined) {
      this.watchlist_empty_yn = false

      var watchlist_json_v1 = JSON.parse(this.watchlist)
      this.watchlist_json = watchlist_json_v1.map((record: any) => JSONtoMovieTvItemMapper(record))
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

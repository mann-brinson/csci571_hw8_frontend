import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { LocalStorageService } from 'src/app/components/local-storage/local-storage.service';
import { MovieTvItem } from 'src/app/components/homepage/movieTvItem';

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

  constructor(
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router) { }
 
  ngOnInit() {
    this.lru_cache = this.localStorageService.localStorage["lru_cache"]
    this.watchlist = this.localStorageService.localStorage["watchlist"]

    this.len_localStorage = this.localStorageService.localStorage.length

    // console.log({"lru_cache": this.lru_cache})
    // console.log({"watchlist": this.watchlist})
    // console.log({"len_localstorage": this.len_localStorage})

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
    if (this.lru_cache != undefined) {
      console.log("lru_cache exists")
      this.lruCache_empty_yn = false
      this.lruCache_json = JSON.parse(this.lru_cache)

      // console.log({"lruCache_json": typeof this.lruCache_json})
    }

    if (this.watchlist != undefined) {
      this.watchlist_empty_yn = false

      var watchlist_json_v1 = JSON.parse(this.watchlist)
      this.watchlist_json = watchlist_json_v1.map((record: any) => JSONtoMovieTvItemMapper(record))
      
      // console.log(this.watchlist_json)

    }
    
  }

  gotoMovieTvPage(event: Event) {
    let entityType_movieId: string = (event.target as Element).id
    var entity_type = entityType_movieId.split('-')[0]
    var movie_id = entityType_movieId.split('-')[1]

    console.log({"going to ": [entity_type, movie_id]})
    // console.log(`/watch/${entity_type}/${movie_id}`)
    this.router.navigate([`/watch/${entity_type}/${movie_id}`])
  }

}

import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
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
  len_localStorage2: any;
  localStorage_not_empty: boolean = false;
  localStorage_items: any = [];

  lruCache_empty_yn: boolean = true
  watchlist_empty_yn: boolean = true

  lruCache_json: object = {}
  // lruCache_json: MovieTvItem[] = [];
  // watchlist_json: object = {}
  watchlist_json: MovieTvItem[] = []
  // localStorage = this.localStorageService

  constructor(
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute) { }

  // jsonToMovieTvItem()
 
  ngOnInit() {
    // console.log(this.localStorageChanges$)
    console.log("trigger")
    this.lru_cache = this.localStorageService.localStorage["lru_cache"]
    this.watchlist = this.localStorageService.localStorage["watchlist"]

    this.len_localStorage = this.localStorageService.localStorage.length
    // this.len_localStorage2 = JSON.parse(this.localStorageService.localStorage.getItem("key")!)

    console.log({"lru_cache": this.lru_cache})
    console.log({"watchlist": this.watchlist})
    console.log({"len_localstorage": this.len_localStorage})
    // console.log({"len_localstorage2": this.len_localStorage2})

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

}

import { Component, OnChanges, OnInit } from '@angular/core';
import { MoviepageService } from './moviepage.service';
import { ActivatedRoute } from "@angular/router";
import { LocalStorageService } from '../local-storage/local-storage.service';
import { MovieTvItem } from '../homepage/movieTvItem';

@Component({
  selector: 'app-moviepage',
  templateUrl: './moviepage.component.html',
  styleUrls: ['./moviepage.component.css']
})

export class MoviepageComponent {

  holder = {};
  public preview_video: any = {}
  public details: any = {}
  public credits: any = []
  public reviews: any = []
  public entity_type: string = ""

  public tmdb_page: string = ""

  public similar_empty_yn = true
  public recommended_empty_yn = true

  public similar: MovieTvItem[] = []
  public recommended: MovieTvItem[] = []

  constructor(
    private moviepageService: MoviepageService,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService
    ) { }

  // ngOnInit() {
  ngOnInit() {
    var movie_id = this.route.snapshot.paramMap.get("tmdb_id");
    // console.log({"paramMap": this.route.snapshot.paramMap});

    // console.log({"current type": window.location.pathname.split("/")[2]});

    // Will trigger whenver the tmdb_id in route changes
    this.route.params.subscribe(routeParams => {
      console.log("arrived at this page")



      // var entity_type = window.location.pathname.split("/")[2]
      this.entity_type = window.location.pathname.split("/")[2]

      this.moviepageService.getMoviepage(routeParams.tmdb_id!, this.entity_type)
      .subscribe((data) => {
        // console.log({"current type": window.location.pathname.split("/")[2]});
        console.log("made it here")

        this.holder = data;
        this.preview_video = data.video;
        this.details = data.detail
        this.credits = data.credits
        this.reviews = data.reviews

        this.tmdb_page = `https://www.themoviedb.org/${this.entity_type}/${this.details.tmdb_id}`

        console.log({"details": this.details.name})

        this.similar = data.similar
        this.recommended = data.recommended

        //// SET EMPTY_YN FLAGS
        if (this.similar.length != 0) {
          this.similar_empty_yn = false
        }

        if (this.recommended.length != 0) {
          this.recommended_empty_yn = false
        }

        console.log({"data": this.similar})
        // console.log({"localstorage": this.localStorageService.localStorage})

        //// ADD TO LRU_CACHE HERE
        this.addMovieToLRU()

      })  
    })
  }

  addMovieToLRU() {
    // console.log("checking LRU")
    // console.log(this.details)

    ///PARAMETER
    var max_lru_length = 2 

    var item_to_add = {"id": this.details.tmdb_id,
                        "name": this.details.name,
                        "entity_type": this.entity_type,
                        "poster_path": this.details.poster_path
                      }
    
    var lru_cache = this.localStorageService.get("lru_cache")

    //// LRU EXISTS
    if (lru_cache != null) { 
      // console.log("lru exists")
      // console.log({"storage before": this.localStorageService.localStorage})
      // console.log(lru_cache)

      // Check if the curret movie is in lru
      var i
      var idx = 1000
      var result = []
      for (i = 0; i < lru_cache.length; i++) {
        var record = lru_cache[i]
        if (record.id == this.details.tmdb_id && record.entity_type == this.entity_type) {
          idx = i
          result.push(record)
          break
        }
      }
      console.log({"lru_cache after": result})

      //// MOVIE IN LRU
      if (result.length > 0) {
        // console.log("movie exists in lru")
        // console.log({"lru_cache_arr": JSON.parse(lru_cache)})
        // var new_val = JSON.parse(lru_cache)

        //Pop movie from LRU
        //Add movie to left part of LRU
        var new_val = lru_cache
        new_val.splice(idx, 1)
        new_val.splice(0, 0, result[0])
        console.log({"lru_cache_new": new_val})
        this.localStorageService.set("lru_cache", new_val)
      } 

      //// MOVIE NOT IN LRU
      else {
        console.log("movie not in lru")

        //// LRU IS FULL
        if (lru_cache.length == max_lru_length) {
          console.log("lru is full")
          var new_val = lru_cache
          new_val.pop()
          new_val.splice(0, 0, item_to_add)

          this.localStorageService.set("lru_cache", new_val)
        }
        //// LRU IS NOT FULL
        else {
          // console.log({"lru_cache": JSON.parse(lru_cache)})
          // console.log({"result to add": item_to_add})
          var new_val = lru_cache
          new_val.splice(0, 0, item_to_add)
          // console.log({"lru_cache_new": new_val})

          this.localStorageService.set("lru_cache", new_val)
        }
      }
   
    //// LRU DOES NOT EXIST
    } else {
      // console.log("lru doesn't exist ")
      var lru_cache_new = [{"id": this.details.tmdb_id,
                    "name": this.details.name,
                    "entity_type": this.entity_type,
                    "poster_path": this.details.poster_path
                  }]
      this.localStorageService.set("lru_cache", lru_cache_new)
    }

    // console.log({"storage after": this.localStorageService.localStorage})
  }


}
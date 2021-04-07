import { Component } from '@angular/core';
import { MoviepageService } from './moviepage.service';
import { ActivatedRoute } from "@angular/router";
import { LocalStorageService } from '../local-storage/local-storage.service';
import { MovieTvItem } from '../homepage/movieTvItem';
import { faFacebookSquare, faTwitter } from '@fortawesome/free-brands-svg-icons';
// import { MovieDetail } from '../movie-detail/movieDetail';

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

  public youtube_page: string = ""
  public fb_share_page: string = ""
  public fb_square = faFacebookSquare
  public twitter_share_page: string = ""
  public twitter_square = faTwitter

  public similar_empty_yn = true
  public recommended_empty_yn = true

  public similar: MovieTvItem[] = []
  public recommended: MovieTvItem[] = []

  public primary_page_yn = false

  constructor(
    private moviepageService: MoviepageService,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService
    ) { }

  // ngOnInit() {
  ngOnInit() {
    var movie_id = this.route.snapshot.paramMap.get("tmdb_id");

    // Will trigger whenver the tmdb_id in route changes
    this.route.params.subscribe(routeParams => {
      console.log("arrived at this page")

      // Get entity_type
      this.entity_type = window.location.pathname.split("/")[2]

      this.moviepageService.getMoviepage(routeParams.tmdb_id!, this.entity_type)
      .subscribe((data) => {
        // Assign data to class properties
        this.holder = data;
        this.preview_video = data.video;
        this.details = data.detail
        this.credits = data.credits
        this.reviews = data.reviews

        // Shareable links
        this.youtube_page = encodeURIComponent(`https://www.youtube.com/watch?v=${this.preview_video.key}`)
        this.fb_share_page = `https://www.facebook.com/sharer/sharer.php?u=${this.youtube_page}`
        this.twitter_share_page = `https://twitter.com/intent/tweet?text=Watch%20${encodeURI(this.details.name)}%20${this.youtube_page}&hashtags=USC,CSCI571,FightOn`

        //Recommendations
        this.similar = data.similar
        this.recommended = data.recommended

        //// SET EMPTY_YN FLAGS
        if (this.similar.length != 0) {
          this.similar_empty_yn = false
        } else { this.similar_empty_yn = true }

        if (this.recommended.length != 0) {
          this.recommended_empty_yn = false
        } else { this.recommended_empty_yn = true }

        //// ADD TO LRU_CACHE HERE
        this.addMovieToLRU()

      })  
    })
  }

  addMovieToLRU() {
    ///PARAMETERS
    var max_lru_length = 24

    var item_to_add = {"id": this.details.tmdb_id,
                        "name": this.details.name,
                        "entity_type": this.entity_type,
                        "poster_path": this.details.poster_path
                      }
    var lru_cache = this.localStorageService.get("lru_cache")

    //// LRU EXISTS
    if (lru_cache != null) { 
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
      // console.log({"lru_cache after": result})

      //// MOVIE IN LRU
      if (result.length > 0) {

        //Pop movie from LRU
        //Add movie to left part of LRU
        var new_val = lru_cache
        new_val.splice(idx, 1)
        new_val.splice(0, 0, result[0])
        // console.log({"lru_cache_new": new_val})
        this.localStorageService.set("lru_cache", new_val)
      } 

      //// MOVIE NOT IN LRU
      else {

        //// LRU IS FULL
        if (lru_cache.length == max_lru_length) {
          var new_val = lru_cache
          new_val.pop()
          new_val.splice(0, 0, item_to_add)

          this.localStorageService.set("lru_cache", new_val)
        }
        //// LRU IS NOT FULL
        else {
          var new_val = lru_cache
          new_val.splice(0, 0, item_to_add)

          this.localStorageService.set("lru_cache", new_val)
        }
      }
   
    //// LRU DOES NOT EXIST
    } else {
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
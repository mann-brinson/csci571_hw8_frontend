import { Component, Input } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Component({
  selector: 'app-local-storage',
  templateUrl: './local-storage.component.html',
  styleUrls: ['./local-storage.component.css']
})
export class LocalStorageComponent {

  @Input() movie_details: any = {};
  @Input() entity_type: string = "";

  current_movie_in_watchlist_yn: boolean = false;
  current_movie_key: string = "";

  localStorageChanges$ = this.localStorageService.changes$;

  constructor(private localStorageService: LocalStorageService) { }

  // Absorb incoming data from moviepage
  ngOnChanges() {
    if (Object.keys(this.movie_details).length > 0) { //Triggers when loading input data from moviepage
      console.log("got movie details")
      this.current_movie_key = `${this.entity_type}-${this.movie_details.tmdb_id}`
      this.current_movie_in_watchlist_yn = this.localStorageService.existsYn(this.current_movie_key)
      console.log({"init key": this.current_movie_key})
      console.log({"in watchlist?": this.current_movie_in_watchlist_yn})
    }
  }

  putMovie() {
    // var value = event.target.value;
    //TEST
    // console.log({"curr_item": this.movie_details})
    // console.log({"entity_type": this.entity_type})

    var key = `${this.entity_type}-${this.movie_details.tmdb_id}`
    var value = {"tmdb_id": this.movie_details.tmdb_id,
                "name": this.movie_details.name,
                "entity_type": this.entity_type,
                "poster_path": this.movie_details.poster_path}

    this.localStorageService.set(key, value);
    console.log(this.localStorageService.localStorage)
  }

  removeMovie() {
    var key = `${this.entity_type}-${this.movie_details.tmdb_id}`
    this.localStorageService.remove(key)
    console.log(this.localStorageService.localStorage)
  }

  clearWatchList() {
    this.localStorageService.clear()
    console.log(this.localStorageService.localStorage)
  }

  toggled = false;
  changeLabelName() {

    // TESTING
    // console.log({"button_status": this.toggled})
    // console.log({"details": this.movie_details});
    // console.log({"entity_type": this.entity_type})

    if (this.toggled == false) {
      this.toggled = true;
      document.getElementById("button")!.innerHTML = "Remove from Watchlist";
    } else {
      this.toggled = false;
      document.getElementById("button")!.innerHTML = "Add to Watchlist";
    }
  }

  checkForCurrentMovie() {
    var key = `${this.entity_type}-${this.movie_details.tmdb_id}`
    var exists_yn = this.localStorageService.existsYn(key)
    console.log({"exists_yn": exists_yn})

    if (exists_yn) {
      document.getElementById("button-2")!.innerHTML = "Remove from Watchlist";
    } else {
      document.getElementById("button-2")!.innerHTML = "Add to Watchlist";
    }

  }


}

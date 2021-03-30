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

  putMoviev2() {
    // console.log(this.localStorageService.localStorage.length)
    var len_storage: number = this.localStorageService.localStorage.length
    var key = "watchlist"

    // NO WATCHLIST
    if (len_storage == 0) {
      // console.log("storage is empty")
      var value = [{"tmdb_id": this.movie_details.tmdb_id,
                    "name": this.movie_details.name,
                    "entity_type": this.entity_type,
                    "poster_path": this.movie_details.poster_path
                  }]
      this.localStorageService.set(key, value);
      console.log(this.localStorageService.localStorage)

    // PRE-EXISTING WATCHLIST
    } else {
      var temp_val = JSON.parse(this.localStorageService.localStorage.getItem(key)!)
      console.log({"val to search": this.movie_details.tmdb_id})
      console.log({"val to be searched": temp_val})

      var result = temp_val.filter((record: any) => 
        record.tmdb_id == this.movie_details.tmdb_id && record.entity_type == this.entity_type)

      console.log({"result": result.length})

      if (result.length == 0) { //RECORD DOES NOT EXIST
        console.log("storage is not empty")
        var record = {"tmdb_id": this.movie_details.tmdb_id,
                      "name": this.movie_details.name,
                      "entity_type": this.entity_type,
                      "poster_path": this.movie_details.poster_path
                    }
        temp_val.splice(0, 0, record)
        this.localStorageService.set(key, temp_val)
        console.log({"storage after": this.localStorageService.localStorage})
      }
    }
  }

  removeMovie() {
    var key = `${this.entity_type}-${this.movie_details.tmdb_id}`
    this.localStorageService.remove(key)
    console.log(this.localStorageService.localStorage)
  }

  removeMoviev2() {
    var len_storage: number = this.localStorageService.localStorage.length
    var key = "watchlist"

    if (len_storage == 0) {
      console.log("No watchlist to remove items from.")

    } else {
      console.log(this.movie_details.tmdb_id)
      console.log(this.entity_type)

      var watchlist_prev = JSON.parse(this.localStorageService.localStorage.getItem(key)!)
      console.log({"prev": watchlist_prev})
      // watchlist_new = watchlist_prev.filter(function (record) {
      //   return record.tmdb_id == this.movie_details.tmdb_id && record.entity_type == this.entity_type
      // })
      var watchlist_new = watchlist_prev.filter((record: any) => 
        record.tmdb_id != this.movie_details.tmdb_id || record.entity_type != this.entity_type)
      console.log({"new": watchlist_new.length})

      if (watchlist_new.length == 0) {
        console.log("new watchlist is empty")
        this.localStorageService.clear()
        console.log(this.localStorageService.localStorage)
        
      } else {
        this.localStorageService.set(key, watchlist_new)
      }

      

    }
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

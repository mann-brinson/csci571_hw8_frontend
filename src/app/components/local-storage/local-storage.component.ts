import { Component, Input } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Component({
  selector: 'app-local-storage',
  templateUrl: './local-storage.component.html',
  styleUrls: ['./local-storage.component.css']
})
export class LocalStorageComponent {

  @Input() movie_details: any = {}
  @Input() entity_type: string = ""

  current_movie_in_watchlist_yn: string = "0"
  current_movie_key: string = ""

  // exists_yn_to_button_text: object = {"1": "Remove from Watchlist", "0": "Add to Watchlist"}
  button_text: string = ""

  localStorageChanges$ = this.localStorageService.changes$;

  constructor(private localStorageService: LocalStorageService) { }

  // Absorb incoming data from moviepage
  ngOnChanges() {
    if (Object.keys(this.movie_details).length > 0) { //Triggers when loading input data from moviepage
      console.log("got movie details")

      var len_storage: number = this.localStorageService.localStorage.length
      if (len_storage == 0) {
        this.current_movie_in_watchlist_yn = "0"
        this.button_text = "Add to Watchlist"
      }
      else {
        var temp_val = JSON.parse(this.localStorageService.localStorage.getItem("watchlist")!)
        console.log({"onchanges": temp_val})

        var result = temp_val.filter((record: any) => 
          record.tmdb_id == this.movie_details.tmdb_id && record.entity_type == this.entity_type)

        if (result.length == 0) { //RECORD DOES NOT EXIST
          this.current_movie_in_watchlist_yn = "0"
          this.button_text = "Add to Watchlist"
        } else { //RECORD EXISTS
          this.current_movie_in_watchlist_yn = "1"
          this.button_text = "Remove from Watchlist"
        }
      }
      console.log({"in watchlist?": this.current_movie_in_watchlist_yn})
      console.log({"button_text": this.button_text})
    }
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
      // console.log({"val to search": this.movie_details.tmdb_id})
      // console.log({"val to be searched": temp_val})

      var result = temp_val.filter((record: any) => 
        record.tmdb_id == this.movie_details.tmdb_id && record.entity_type == this.entity_type)

      // console.log({"result": result.length})

      if (result.length == 0) { //RECORD DOES NOT EXIST
        // console.log("storage is not empty")
        var record = {"tmdb_id": this.movie_details.tmdb_id,
                      "name": this.movie_details.name,
                      "entity_type": this.entity_type,
                      "poster_path": this.movie_details.poster_path
                    }
        temp_val.splice(0, 0, record)
        this.localStorageService.set(key, temp_val)
        // console.log({"storage after": this.localStorageService.localStorage})
      }
    }
    this.button_text = "Remove from Watchlist"
    // console.log({"button_text": this.button_text})
  }

  removeMoviev2() {
    var len_storage: number = this.localStorageService.localStorage.length
    var key = "watchlist"

    if (len_storage == 0) {
      console.log("No watchlist to remove items from.")

    } else {
      // console.log(this.movie_details.tmdb_id)
      // console.log(this.entity_type)

      var watchlist_prev = JSON.parse(this.localStorageService.localStorage.getItem(key)!)
      // console.log({"prev": watchlist_prev})

      var watchlist_new = watchlist_prev.filter((record: any) => 
        record.tmdb_id != this.movie_details.tmdb_id || record.entity_type != this.entity_type)
      // console.log({"new": watchlist_new.length})

      if (watchlist_new.length == 0) {
        // console.log("new watchlist is empty")
        this.localStorageService.clear()
        // console.log(this.localStorageService.localStorage)
        
      } else {
        this.localStorageService.set(key, watchlist_new)
      }
    }
    this.button_text = "Add to Watchlist"
    // console.log({"button_text": this.button_text})
  }

  finalButton() {
    if (this.button_text == "Remove from Watchlist") {
      this.removeMoviev2()
    } else if (this.button_text == "Add to Watchlist") {
      this.putMoviev2()
    }
  }

  clearWatchList() {
    this.localStorageService.clear()
    console.log(this.localStorageService.localStorage)
  }

}

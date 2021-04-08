import { Component, Input, ViewChild } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = []

@Component({
  selector: 'app-local-storage',
  templateUrl: './local-storage.component.html',
  styleUrls: ['./local-storage.component.css']
})
export class LocalStorageComponent {

  @Input() movie_details: any = {}
  @Input() entity_type: string = ""

  @ViewChild('addAlert', {static: false}) addAlert: any; 
  @ViewChild('removeAlert', {static: false}) removeAlert: any; 

  public alerts: Alert[] = []
  public alerts_empty_yn: boolean = true

  current_movie_in_watchlist_yn: string = "0"
  current_movie_key: string = ""

  button_text: string = ""

  constructor(private localStorageService: LocalStorageService) { }

  closeAlert(event: Event) {
    var alert_id = (event.target as Element).id

    if (alert_id = "add_item") {
      this.addAlert.nativeElement.classList.remove('show')
    } 
    if (alert_id = "remove_item") {
      this.removeAlert.nativeElement.classList.remove('show')
    }

    this.alerts_empty_yn = true
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1)
  }

  // Absorb incoming data from moviepage
  ngOnChanges() {
    if (Object.keys(this.movie_details).length > 0) { //Triggers when loading input data from moviepage

      var len_storage: number = this.localStorageService.localStorage.length

      // The watchlist doesn't exist
      if (!("watchlist" in this.localStorageService.localStorage)) { 
        this.current_movie_in_watchlist_yn = "0"
        this.button_text = "Add to Watchlist"
      }

      // The watchlist exists
      else {
        var temp_val = JSON.parse(this.localStorageService.localStorage.getItem("watchlist")!)

        var result = temp_val.filter((record: any) => 
          record.id == this.movie_details.tmdb_id && record.entity_type == this.entity_type)

        if (result.length == 0) { //RECORD DOES NOT EXIST
          this.current_movie_in_watchlist_yn = "0"
          this.button_text = "Add to Watchlist"
        } else { //RECORD EXISTS
          this.current_movie_in_watchlist_yn = "1"
          this.button_text = "Remove from Watchlist"
        }
      }
    }
  }

  putMoviev2() {
    // console.log(this.localStorageService.localStorage.length)
    // var len_storage: number = this.localStorageService.localStorage.length
    // var key = "watchlist"

    var watchlist = this.localStorageService.get("watchlist")

    // NO WATCHLIST
    if (watchlist == null) {
      var value = [{"id": this.movie_details.tmdb_id,
                    "name": this.movie_details.name,
                    "entity_type": this.entity_type,
                    "poster_path": this.movie_details.poster_path
                  }]
      this.localStorageService.set("watchlist", value)

    // PRE-EXISTING WATCHLIST
    } else {
      var temp_val = watchlist

      var result = temp_val.filter((record: any) => 
        record.id == this.movie_details.tmdb_id && record.entity_type == this.entity_type)

      if (result.length == 0) { //RECORD DOES NOT EXIST
        var record = {"id": this.movie_details.tmdb_id,
                      "name": this.movie_details.name,
                      "entity_type": this.entity_type,
                      "poster_path": this.movie_details.poster_path
                    }
        temp_val.splice(0, 0, record)
        this.localStorageService.set("watchlist", temp_val)
      }
    }
    this.button_text = "Remove from Watchlist"
  }

  removeMoviev2() {
    var watchlist = this.localStorageService.get("watchlist")

    // No watchlist to remove items from.
    if (watchlist == null) {

    } else {
      var watchlist_prev = watchlist
      var watchlist_new = watchlist_prev.filter((record: any) => 
        record.id != this.movie_details.tmdb_id || record.entity_type != this.entity_type)

      if (watchlist_new.length == 0) {
        this.localStorageService.remove("watchlist")
        
      } else {
        this.localStorageService.set("watchlist", watchlist_new)
      }
    }
    this.button_text = "Add to Watchlist"
  }

  finalButton() {
    if (this.button_text == "Remove from Watchlist") {
      this.removeMoviev2()

      var alert_to_send: Alert = {type: 'secondary', message: 'Removed from Watchlist.'}
      this.alerts.push(alert_to_send)
      this.alerts_empty_yn = false

    } else if (this.button_text == "Add to Watchlist") {
      this.putMoviev2()
      
      var alert_to_send: Alert = {type: 'success', message: 'Added to Watchlist.'}
      this.alerts.push(alert_to_send)
      this.alerts_empty_yn = false
    }
  }

  clearWatchList() {
    this.localStorageService.clear()
    console.log(this.localStorageService.localStorage)
  }

}

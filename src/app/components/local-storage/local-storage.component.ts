import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { SelectControlValueAccessor } from '@angular/forms';
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

  // @ViewChild('alert', { static: true })
  @ViewChild('addAlert', {static: false}) addAlert: any; 
  @ViewChild('removeAlert', {static: false}) removeAlert: any; 

  public alerts: Alert[] = []
  public alerts_empty_yn: boolean = true

  closeAlert(event: Event) {
    var alert_id = (event.target as Element).id
    console.log({"alert_id": alert_id})
    // console.log({"Current Add Item": this.addAlert.nativeElement.classList[0]})
    // console.log({"Current Remove Item": this.removeAlert.nativeElement.classList[0]})
    var current_alert_is_add_yn = false
    var current_alert_is_remove_yn = false

    if (alert_id = "add_item") {
      this.addAlert.nativeElement.classList.remove('show')
      
    } 
    if (alert_id = "remove_item") {
      this.removeAlert.nativeElement.classList.remove('show')
    }

    this.alerts_empty_yn = true
  }

  close(alert: Alert) {
    console.log("close alert")
    this.alerts.splice(this.alerts.indexOf(alert), 1)
  }

  current_movie_in_watchlist_yn: string = "0"
  current_movie_key: string = ""

  // exists_yn_to_button_text: object = {"1": "Remove from Watchlist", "0": "Add to Watchlist"}
  button_text: string = ""

  constructor(private localStorageService: LocalStorageService) { }

  // Absorb incoming data from moviepage
  ngOnChanges() {
    if (Object.keys(this.movie_details).length > 0) { //Triggers when loading input data from moviepage
      console.log("got movie details")

      var len_storage: number = this.localStorageService.localStorage.length
      console.log(!("watchlist" in this.localStorageService.localStorage))

      // The watchlist doesn't exist
      if (!("watchlist" in this.localStorageService.localStorage)) { 
        this.current_movie_in_watchlist_yn = "0"
        this.button_text = "Add to Watchlist"
      }

      // The watchlist exists
      else {
        var temp_val = JSON.parse(this.localStorageService.localStorage.getItem("watchlist")!)
        console.log({"onchanges": temp_val})

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
      console.log({"in watchlist?": this.current_movie_in_watchlist_yn})
      console.log({"button_text": this.button_text})
    }
  }

  putMoviev2() {
    // console.log(this.localStorageService.localStorage.length)
    var len_storage: number = this.localStorageService.localStorage.length
    var key = "watchlist"

    var watchlist = this.localStorageService.get("watchlist")

    // NO WATCHLIST
    // if (len_storage == 0) {
    if (watchlist == null) {
    
      console.log("storage is empty")
      var value = [{"id": this.movie_details.tmdb_id,
                    "name": this.movie_details.name,
                    "entity_type": this.entity_type,
                    "poster_path": this.movie_details.poster_path
                  }]
      this.localStorageService.set("watchlist", value);
      console.log(this.localStorageService.localStorage)

    // PRE-EXISTING WATCHLIST
    } else {
      // var temp_val = JSON.parse(this.localStorageService.localStorage.getItem(key)!)
      // var temp_val = JSON.parse(watchlist)
      var temp_val = watchlist

      // console.log({"val to search": this.movie_details.tmdb_id})
      // console.log({"val to be searched": temp_val})

      var result = temp_val.filter((record: any) => 
        record.id == this.movie_details.tmdb_id && record.entity_type == this.entity_type)

      // console.log({"result": result.length})

      if (result.length == 0) { //RECORD DOES NOT EXIST
        // console.log("storage is not empty")
        var record = {"id": this.movie_details.tmdb_id,
                      "name": this.movie_details.name,
                      "entity_type": this.entity_type,
                      "poster_path": this.movie_details.poster_path
                    }
        temp_val.splice(0, 0, record)
        this.localStorageService.set("watchlist", temp_val)
        // console.log({"storage after": this.localStorageService.localStorage})
      }
    }
    this.button_text = "Remove from Watchlist"
    // console.log({"button_text": this.button_text})
  }

  removeMoviev2() {
    var len_storage: number = this.localStorageService.localStorage.length
    var key = "watchlist"
    var watchlist = this.localStorageService.get("watchlist")

    // if (len_storage == 0) {
    if (watchlist == null) {
      console.log("No watchlist to remove items from.")

    } else {
      // console.log(this.movie_details.tmdb_id)
      // console.log(this.entity_type)
      console.log({"watchlist": watchlist})

      var watchlist_prev = watchlist
      // console.log({"prev": watchlist_prev})

      var watchlist_new = watchlist_prev.filter((record: any) => 
        record.id != this.movie_details.tmdb_id || record.entity_type != this.entity_type)
      // console.log({"new": watchlist_new.length})

      if (watchlist_new.length == 0) {
        // console.log("new watchlist is empty")
        this.localStorageService.remove("watchlist")
        // console.log(this.localStorageService.localStorage)
        
      } else {
        this.localStorageService.set("watchlist", watchlist_new)
      }
    }
    this.button_text = "Add to Watchlist"
    // console.log({"button_text": this.button_text})
  }

  finalButton() {
    if (this.button_text == "Remove from Watchlist") {
      this.removeMoviev2()
      // this.removeAlert.nativeElement.classList.add("show")

      var alert_to_send: Alert = {type: 'secondary', message: 'Removed from Watchlist.'}
      this.alerts.push(alert_to_send)
      this.alerts_empty_yn = false

    } else if (this.button_text == "Add to Watchlist") {
      this.putMoviev2()
      // this.addAlert.nativeElement.classList.add('show');

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

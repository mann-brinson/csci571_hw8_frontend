import { Component, Input } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Component({
  selector: 'app-local-storage',
  templateUrl: './local-storage.component.html',
  styleUrls: ['./local-storage.component.css']
})
export class LocalStorageComponent {

  @Input() movie_details: any = {};

  constructor(private localStorageService: LocalStorageService) { }

  putMovie(entity_type: string, tmdb_id: string, value: string) {
    // var value = event.target.value;
    var key = `${entity_type}${tmdb_id}`
    this.localStorageService.set(key, value);
    console.log(this.localStorageService.localStorage)
  }

  removeMovie(entity_type: string, tmdb_id: string, value: string) {
    var key = `${entity_type}${tmdb_id}`
    this.localStorageService.remove(key)
    console.log(this.localStorageService.localStorage)
  }

  clearWatchList() {
    this.localStorageService.clear()
    console.log(this.localStorageService.localStorage)
  }

  toggled = false;
  changeLabelName() {

    console.log({"button_status": this.toggled})
    console.log({"details": this.movie_details});


    if (this.toggled == false) {
      this.toggled = true;
      document.getElementById("button")!.innerHTML = "Remove from Watchlist";
    } else {
      this.toggled = false;
      document.getElementById("button")!.innerHTML = "Add to Watchlist";
    }
  }

}

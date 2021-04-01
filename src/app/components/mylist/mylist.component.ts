import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { LocalStorageService } from 'src/app/components/local-storage/local-storage.service';

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
  // localStorage = this.localStorageService

  constructor(
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute) { }
    
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

    if (this.len_localStorage > 0) {

    //   console.log("Watchlist is not empty")
      this.localStorage_not_empty = true

    //   for (var i = 0; i < this.len_localStorage; i++) {
    //     var record: object = {}
    //     console.log(localStorage.key(i))
    //     var key: string = localStorage.key(i)!
    //     var value = JSON.parse(localStorage.getItem(key)!)
    //     // record[key] = value
    //     console.log({key: value})

    //     this.localStorage_items.push({key: value})
    //   }

    //   // console.log(this.localStorage_items)

    }
    
  }

}

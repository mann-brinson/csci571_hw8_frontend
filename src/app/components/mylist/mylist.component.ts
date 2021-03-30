import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/components/local-storage/local-storage.service';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.css']
})
export class MylistComponent {
  localStorageChanges$ = this.localStorageService.changes$;
  len_localStorage: number = 0;
  localStorage_not_empty: boolean = false;
  localStorage_items: any = [];
  // localStorage = this.localStorageService

  constructor(private localStorageService: LocalStorageService) { }
    
  ngOnInit() {
    // console.log(this.localStorageChanges$)
    this.len_localStorage = this.localStorageService.localStorage.length

    if (this.len_localStorage > 0) {

      console.log("Watchlist is not empty")
      this.localStorage_not_empty = true;

      for (var i = 0; i < this.len_localStorage; i++) {
        var record: object = {}
        console.log(localStorage.key(i))
        var key: string = localStorage.key(i)!
        var value = JSON.parse(localStorage.getItem(key)!)
        // record[key] = value
        console.log({key: value})

        this.localStorage_items.push({key: value})
      }

      // console.log(this.localStorage_items)

    }
    
  }

}

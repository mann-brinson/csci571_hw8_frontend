import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  localStorage: Storage;

  changes$ = new Subject();

  constructor() {
    this.localStorage = window.localStorage;
  }
  
  get(key: string): any {
    if (this.isLocalStorageSupported) {
      return JSON.parse(this.localStorage.getItem(key)!);
    }
    return null;
  }
  set(key: string, value: any): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }
  remove(key: string): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(key);
      return true;
    }
    return false;
  }

  clear(): void {
    this.localStorage.clear();
  }

  existsYn(key: string): boolean {
    if (key in this.localStorage) {
      return true
    }
    return false
  }

  existsYnV2(entity_type: string, tmdb_id: any): boolean {
    if ("watchlist" in this.localStorage) {
      console.log("watchlist exists")
      console.log(this.localStorage.getItem("watchlist"))
      var temp_val = this.localStorage.getItem("watchlist")!
      
      if (temp_val.length == 0) {
        return false
      }
      else {
        var result = JSON.parse(temp_val).filter((record: any) => 
          record.tmdb_id == tmdb_id && record.entity_type == entity_type)
        
        if (result.length == 0) { //RECORD DOES NOT EXIST
          return false
        } 
        return true
      }
    }
    return false
  }


  get isLocalStorageSupported(): boolean {
    return !!this.localStorage
  }
}
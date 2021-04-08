import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';
import { SearchResultItem } from './SearchResultItem';

//// MOVIE APP
const SEARCH_URL = 'http://localhost:8080/apis/search/';

@Injectable()
export class SearchService {
  constructor(
    private http: HttpClient,
  ) {}

  search(term: string) {
    if (term.length < 2) {
      return of([]);
    }

    var url_full = `${SEARCH_URL}${term}`
    var result = this.http.get<SearchResultItem[]>(url_full)
      .pipe(
        map(response => response)

      );
    // console.log({"search triggered": result})
    return result
  }
}

@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
  providers: [SearchService],
  styleUrls: ['./typeahead.component.css']
})
export class TypeaheadComponent {
  public model: any;
  searching = false;
  searchFailed = false;

  constructor(
    private _service: SearchService,
    private router: Router
  ) { }

  // VERSION 2
  search = (text$: 
      Observable<string>) =>
        text$.pipe(
          debounceTime(300),
          distinctUntilChanged(),
          tap(() => this.searching = true),
          switchMap(term =>
            this._service.search(term).pipe(
              
              tap(() => {
                // console.log("test") //Every time we search
                this.searchFailed = false
              }),
              catchError(() => {
                this.searchFailed = true;
                return of([]);
              }))
          ),
          tap(() => {
            this.searching = false
            // console.log("apple") //Every time we search
          })
        )

  formatter = (x: {name: string, backdrop_path: string}) => x.name;

  tmdb_id = "";
  media_type = "";

  selectedItem(event: any) {
    // this.clickedItem = item
    this.tmdb_id = event.item.id;
    this.media_type = event.item.media_type;

    // console.log({"tmdb_id": this.tmdb_id,
    //               "media_type": this.media_type})
    // console.log(`/watch/${this.media_type}/${this.tmdb_id}`)
    this.router.navigate([`/watch/${this.media_type}/${this.tmdb_id}`]);
    
  }

}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable, of, OperatorFunction} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';
import { SearchResultItem } from './SearchResultItem';

//// MOVIE APP
const SEARCH_URL = 'http://localhost:8080/search/';

@Injectable()
export class SearchService {
  constructor(private http: HttpClient) {}

  search(term: string) {
    if (term.length < 2) {
      return of([]);
    }

    var url_full = `${SEARCH_URL}${term}`
    var result = this.http.get<SearchResultItem[]>(url_full)
      .pipe(
        map(response => response)

      );
    console.log({"result": result})
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


  constructor(private _service: SearchService) { }

  inputFormatMovieListValue(value: any)   {
    if(value.name)
      return value.name
    return value;
  }

  resultFormatMovieListValue(value: any) {            
    return value.name;
  } 

  // VERSION 1
  // search = (text$: 
  //   Observable<string>) =>
  //     text$.pipe(
  //       debounceTime(300),
  //       distinctUntilChanged(),
  //       tap(() => this.searching = true),
  //       switchMap(term =>
  //         this._service.search(term).pipe(
            
  //           tap(() => this.searchFailed = false),
  //           catchError(() => {
  //             this.searchFailed = true;
  //             return of([]);
  //           }))
  //       ),
  //       tap(() => this.searching = false)
  //     )

  // VERSION 2
  search = (text$: 
      Observable<string>) =>
        text$.pipe(
          debounceTime(300),
          distinctUntilChanged(),
          tap(() => this.searching = true),
          switchMap(term =>
            this._service.search(term).pipe(
              
              tap(() => this.searchFailed = false),
              catchError(() => {
                this.searchFailed = true;
                return of([]);
              }))
          ),
          tap(() => this.searching = false)
        )

  formatter = (x: {name: string, backdrop_path: string}) => x.name;

}

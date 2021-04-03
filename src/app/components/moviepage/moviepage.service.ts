import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieObj } from './movieobj';

@Injectable()
export class MoviepageService {

    // private _url: string = 'http://localhost:8080/watch/movie/155';

    constructor(private http: HttpClient) {}

    // WORKING
    // getMoviepage(movie_id: string): Observable<MovieObj> {
    getMoviepage(movie_id: string, entity_type: string): Observable<MovieObj> {
        
        // return this.http.get<MovieObj>(this._url)
        var url = `http://localhost:8080/watch/${entity_type}/${movie_id}`
        return this.http.get<MovieObj>(url)
    }

}
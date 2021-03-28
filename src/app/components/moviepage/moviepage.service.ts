import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieObj } from './movieobj';

@Injectable()
export class MoviepageService {

    private _url: string = 'http://localhost:8080/watch/movie/155';

    constructor(private http: HttpClient) {}

    // WORKING
    getMoviepage(): Observable<MovieObj> {
        return this.http.get<MovieObj>(this._url)
    }

}
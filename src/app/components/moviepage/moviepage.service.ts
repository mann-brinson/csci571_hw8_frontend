import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieObj } from './movieobj';

@Injectable()
export class MoviepageService {

    constructor(private http: HttpClient) {}

    getMoviepage(movie_id: string, entity_type: string): Observable<MovieObj> {

        var url = `http://localhost:8080/apis/watch/${entity_type}/${movie_id}`
        return this.http.get<MovieObj>(url)
    }

}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TvObj } from './tvobj';

@Injectable()
export class TvpageService {

    private _url: string = 'http://localhost:8080/watch/tv/1435';

    constructor(private http: HttpClient) {}

    // WORKING
    getTvpage(tv_id: string): Observable<TvObj> {

        var url = `http://localhost:8080/watch/tv/${tv_id}`
        return this.http.get<TvObj>(url)
    }

}
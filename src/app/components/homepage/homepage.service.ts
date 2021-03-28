import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeObj } from './homeobj';

@Injectable()
export class HomepageService {

    private _url: string = 'http://localhost:8080/';

    constructor(private http: HttpClient) {}

    // ATTEMPT 1
    // getHomepage(): Observable<HomeObj> {
    //     return this.http.get<HomeObj>(this._url)
    //         // .pipe()
    // }

    // ATTEMPT 4
    getHomepage(): Observable<HomeObj> {
        return this.http.get<HomeObj>(this._url)
    }

}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeObj } from './homeobj';

@Injectable()
export class HomepageService {

    // private _url: string = 'http://localhost:8080/apis'; //TEST
    private _url: string = 'https://csci571-hw8-nodejs-2021sp.wl.r.appspot.com/apis' //PROD

    constructor(private http: HttpClient) {}

    // WORKING
    getHomepage(): Observable<HomeObj> {
        return this.http.get<HomeObj>(this._url)
    }

}
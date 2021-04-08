import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CastItemFull } from 'src/app/components/cast-list/castItem';

@Injectable()
export class CastItemFullService {

    constructor(private http: HttpClient) {}

    // WORKING
    getCastItemFull(person_id: string): Observable<CastItemFull> {
        // var cast_url = `http://localhost:8080/apis/person/${person_id}`; //TEST
        var cast_url = `https://csci571-hw8-nodejs-2021sp.wl.r.appspot.com/apis/person/${person_id}` //PROD
        return this.http.get<CastItemFull>(cast_url)
    }

}
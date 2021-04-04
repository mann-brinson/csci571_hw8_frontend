import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CastItemFull } from 'src/app/components/cast-list/castItem';

@Injectable()
export class CastItemFullService {

    constructor(private http: HttpClient) {}

    // WORKING
    getCastItemFull(person_id: string): Observable<CastItemFull> {
        var cast_url = `http://localhost:8080/person/${person_id}`
        // var cast_obj = this.http.get<CastItemFull>(cast_url)
        // return cast_obj
        return this.http.get<CastItemFull>(cast_url)
    }

}
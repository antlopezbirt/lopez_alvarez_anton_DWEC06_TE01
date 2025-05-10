import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class ComentariosService {

    private baseUrl: string = 'https://ca7e578e527fbb088f2c.free.beeceptor.com/api/comments/';

    constructor ( private _http: HttpClient ) {}

    getAll(): Observable<any> {
        return this._http.get(this.baseUrl);
    }

    getById(id: string): Observable<any> {
        return this._http.get(this.baseUrl + id);
    }

    create(comentario: any): Observable<any> {
        return this._http.post(this.baseUrl, comentario);
    }

    update(id: string, comentario: any): Observable<any> {
        return this._http.post(this.baseUrl + id, comentario);
    }

    delete(id: string): Observable<any> {
        return this._http.delete(this.baseUrl + id);
    }
}


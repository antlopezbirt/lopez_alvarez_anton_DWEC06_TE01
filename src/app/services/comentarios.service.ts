import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Comentario } from "../models/Comentario";

@Injectable()
export class ComentariosService {

    // private baseUrl: string = 'https://ca7e578e527fbb088f2c.free.beeceptor.com/api/comments/';
    // private baseUrl: string = 'https://pruebas.free.beeceptor.com/api/comments/';
    private baseUrl: string = 'https://68209462259dad2655acf7e3.mockapi.io/api/comments';

    constructor ( private _http: HttpClient ) {}

    getAll(): Observable<Comentario[]> {
        // let params = new HttpParams();
        // params = params.append('sortBy', 'fecha');
        // params = params.append('order', 'desc');

        // let url = new URL(this.baseUrl);
        // url.searchParams.append('sortBy', 'id');
        // url.searchParams.append('order', 'desc');
        return this._http.get<Comentario[]>(this.baseUrl, {headers: new HttpHeaders('content-type:application/json')});
    }

    getById(id: string): Observable<any> {
        return this._http.get<Comentario>(this.baseUrl + '/' + id);
    }

    create(comentario: any): Observable<any> {
        return this._http.post(this.baseUrl, comentario);
    }

    update(id: string, comentario: any): Observable<any> {
        return this._http.put(this.baseUrl + '/' + id, comentario);
    }

    delete(id: string): Observable<any> {
        return this._http.delete(this.baseUrl + '/' + id);
    }
}


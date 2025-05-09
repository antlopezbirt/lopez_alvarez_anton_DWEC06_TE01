import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable()
export class OfertasService {
    
    public url: string;

    constructor(public _http: HttpClient) {
        this.url = "https://apidatos.ree.es/en/datos/demanda/evolucion?start_date=2020-01-01T00:00&end_date=2020-01-31T23:59&time_trunc=day&geo_trunc=electric_system&geo_limit=peninsular&geo_ids=8741"
    }

    read(): Observable<any> {
        return this._http.get(this.url);
    }
}
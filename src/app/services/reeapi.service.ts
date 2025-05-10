import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable()
export class ReeApiService {
    
    private baseUrl: string = "https://apidatos.ree.es/es/datos/";
    private endpoints: { [key: string]: string } = {
        generacion: 'generacion/evolucion-renovable-no-renovable',
        demanda: 'demanda/evolucion',
        mix: 'balance/balance-electrico'

    };

    constructor(public _http: HttpClient) {}

    read(endpoint: string, parametros: any): Observable<any> {
        return this._http.get(this.baseUrl + this.endpoints[endpoint], { params: parametros });
    }
}



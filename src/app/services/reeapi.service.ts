import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable()
export class ReeApiService {
    
    // API correcta:
    private baseUrl: string = "https://apidatos.ree.es/es/datos/";

    // API para errores:
    // private baseUrl: string = "https://apidatos.reeeeeeeee.es/es/datos/";
    
    private endpoints: { [key: string]: string } = {
        generacion: 'generacion/evolucion-renovable-no-renovable',
        demanda: 'demanda/evolucion',
        mix: 'balance/balance-electrico'

    };

    constructor(private _http: HttpClient) {}

    read(endpoint: string, parametros: any): Observable<any> {
        return this._http.get(this.baseUrl + this.endpoints[endpoint], { params: parametros });
    }
}



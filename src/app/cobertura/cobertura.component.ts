import { Component, OnInit } from '@angular/core';
import { Demanda } from '../models/Demanda';
import { Comentario } from '../models/Comentario';
import { Generacion } from '../models/Generacion';
import { ReeApiService } from '../services/reeapi.service';

import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-cobertura',
  standalone: false,
  templateUrl: './cobertura.component.html',
  styleUrl: './cobertura.component.css',
  providers: [ReeApiService]
})

export class CoberturaComponent implements OnInit {

  public seccion: Comentario["seccion"] = "cobertura";
  public cargando: boolean = true;
  public errorApiError: string | null = null;
  public errorApiMessage: string | null = null;

  public demandas: Array<Demanda> = [];
  public genRenovables: Array<Generacion> = [];
  public genNoRenovables: Array<Generacion> = [];

  
  public grafico: any;

  public parametrosDemanda: any;
  public parametrosGeneracion: any;

  constructor(private _reeApiService: ReeApiService ) {

    // El rango es los últimos 30 días contando el actual
    let fechaActual: Date = new Date();
    let fechaHaceUnMes: Date = new Date(fechaActual.getTime() - 29 * 24 * 60 * 60 * 1000);
    fechaHaceUnMes.setUTCHours(0,0,0,0);

    // Prepara los parámetros del endpoint de Generación
    this.parametrosGeneracion = {
      start_date: fechaHaceUnMes.toISOString(),
      end_date: fechaActual.toISOString(),
      time_trunc: 'day',
      geo_limit: 'peninsular',
      geo_ids: '8741'
    }

    // Los parámetros para la Demanda son iguales excepto uno extra
    this.parametrosDemanda = this.parametrosGeneracion;

    // Añade el parametro extra para el endpoint de Demanda
    this.parametrosDemanda.geo_trunc = 'electric_system';

  }

  ngOnInit(): void {
    this.read();
  }

  // Recoge los datos de los diferentes endpoints
  read(): void {
    this._reeApiService.read('demanda', this.parametrosDemanda).subscribe({
      next: data => {
        // Demanda
        for(let dato of data.included[0].attributes.values) {
          let demanda = new Demanda(dato.datetime, dato.value);
          this.demandas.push(demanda);
        }

        this._reeApiService.read('generacion', this.parametrosGeneracion).subscribe({
          next: data => {
            this.errorApiError = null;

            // Generacion renovable
            for(let dato of data.included[0].attributes.values) {
              let generacion = new Generacion(dato.datetime, dato.value, true, dato.percentage);
              this.genRenovables.push(generacion);
            }
            // Generacion no renovable
            for(let dato of data.included[1].attributes.values) {
              let generacion = new Generacion(dato.datetime, dato.value, false, dato.percentage);
              this.genNoRenovables.push(generacion);
            }

            // Si llega hasta aquí es que se han recibido todos los datos y puede construir el gráfico
            this.crearGraficoCobertura();
            this.cargando = false;
          },
          error: error => {

            console.log("Error al leer los datos de Generación: ", error);
            this.cargando = false;

            this.errorApiError = error.error.errors[0].detail;
            this.errorApiMessage = error.message;
          }
        })
      },
      error: error => {
        console.log("Error al leer los datos de Demanda: ", error);
        this.cargando = false;

        this.errorApiError = error.error.errors[0].detail;
        this.errorApiMessage = error.message;
      }
    })
  }

  crearGraficoCobertura() {

    let fechas: Array<String> = this.demandas.map(demanda => demanda.fecha.substring(0, 10));
    let mwGenRenovable: Array<Number> = this.genRenovables.map(generacion => generacion.megavatios);
    let mwGenNoRenovable: Array<Number> = this.genNoRenovables.map(generacion => generacion.megavatios);
    let mwDemanda: Array<Number> = this.demandas.map(demanda => demanda.megavatios);
    this.grafico = new Chart("GraficoCobertura", {
      data: {
        datasets: [{
          type: 'bar',
          label: 'Generación Renovable (MW)',
          data: mwGenRenovable
        }, {
          type: 'bar',
          label: 'Generación No Renovable (MW)',
          data: mwGenNoRenovable
        }, {
          type: 'line',
          label: 'Demanda (MW)',
          data: mwDemanda
        }],
        labels: fechas
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }
        }
      }
    });
  }
}

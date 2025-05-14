import { Component, OnInit } from '@angular/core';
import { Demanda } from '../models/Demanda';
import { Comentario } from '../models/Comentario';
import { ReeApiService } from '../services/reeapi.service';

import { Chart } from 'chart.js/auto';


@Component({
  selector: 'app-demanda',
  standalone: false,
  templateUrl: './demanda.component.html',
  styleUrl: './demanda.component.css',
  providers: [ReeApiService]
})

export class DemandaComponent implements OnInit {

  public seccion: Comentario["seccion"] = "demanda";
  public cargando: boolean = true;
  public errorApiError: string | null = null;
  public errorApiMessage: string | null = null;

  public fechaIni: any;
  public fechaFin: any;
  public demandas: Array<Demanda> = [];
  public diferencias: Array<any> = [];
  public parametrosDemanda: any;
    
  public grafico: any;

  constructor( private _reeApiService: ReeApiService) {

    // El rango por defecto es los últimos 30 días contando el actual
    this.fechaFin = new Date();
    this.fechaIni = new Date(this.fechaFin.getTime() - 30 * 24 * 60 * 60 * 1000);
    this.fechaIni.setUTCHours(0,0,0,0);

    // Prepara los parámetros del endpoint de Demanda
    this.parametrosDemanda = {
      start_date: this.fechaIni.toISOString(),
      end_date: this.fechaFin.toISOString(),
      time_trunc: 'day',
      geo_limit: 'peninsular',
      geo_ids: '8741',
      geo_trunc: 'electric_system'
    }

  }

  ngOnInit(): void {
    this.read();
  }

  read(): void {
    this._reeApiService.read(this.seccion, this.parametrosDemanda).subscribe({
      next: data => {
        this.errorApiError = null;
        let datoAnterior = 0;
        for(let dato of data.included[0].attributes.values) {
          let demanda = new Demanda(dato.datetime, dato.value);
          if(datoAnterior == 0) datoAnterior = dato.value;
          this.diferencias.unshift(((parseFloat(dato.value)*100/datoAnterior) - 100));
          datoAnterior = dato.value;
          this.demandas.unshift(demanda);
        }
        //this.crearGrafico();
        this.cargando = false;
      },
      error: error => {
        console.log("Read error: ", error);
        this.cargando = false;

        this.errorApiError = error.error.errors[0].detail;
        this.errorApiMessage = error.message;
      }
    })
  }

  crearGrafico() {
    let fechas: Array<String> = this.demandas.map(demanda => demanda.fecha.substring(0, 10));
    let megavatios: Array<Number> = this.demandas.map(demanda => demanda.megavatios);
    this.grafico = new Chart("GraficoDemanda", {
      type: 'line',
      data: {
        labels: fechas,
        datasets: [
          {
            label: "Demanda",
            data: megavatios,
            backgroundColor: 'blue'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }
}
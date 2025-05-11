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
})

export class DemandaComponent implements OnInit {

  public seccion: Comentario["seccion"] = "demanda";
  public cargando: boolean = true;

  public demandas: Array<Demanda> = [];
  public parametrosDemanda: any;
    
  public grafico: any;

  constructor( private _reeApiService: ReeApiService) {

    // El rango por defecto es los últimos 30 días contando el actual
    let fechaActual: Date = new Date();
    let fechaHaceUnMes: Date = new Date(fechaActual.getTime() - 29 * 24 * 60 * 60 * 1000);

    // Prepara los parámetros del endpoint de Demanda
    this.parametrosDemanda = {
      start_date: fechaHaceUnMes.toISOString(),
      end_date: fechaActual.toISOString(),
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
        for(let dato of data.included[0].attributes.values) {
          let demanda = new Demanda(dato.datetime, dato.value);
          this.demandas.push(demanda);
        }
        this.crearGrafico();
        this.cargando = false;
      },
      error: error => {
        console.log("Read error: ", error);
        this.cargando = false;
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
import { Component, OnInit } from '@angular/core';
import { DemandasService } from '../services/demandas.service';
import { Demanda } from '../models/Demanda';
import { Generacion } from '../models/Generacion';
import { GeneracionesService } from '../services/generaciones.service';

import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-cobertura',
  standalone: false,
  templateUrl: './cobertura.component.html',
  styleUrl: './cobertura.component.css',
  providers: [DemandasService, GeneracionesService]
})

export class CoberturaComponent {

  public demandas: Array<Demanda> = [];
  public genRenovables: Array<Generacion> = [];
  public genNoRenovables: Array<Generacion> = [];
  public grafico: any;

  constructor(private _demandasServicio: DemandasService, private _generacionesService: GeneracionesService ) {}

  ngOnInit(): void {
    this.read();
  }

  read(): void {
    this._demandasServicio.read().subscribe({
      next: data => {
        //console.log("Demanda: ", data);
        for(let dato of data.included[0].attributes.values) {
          let demanda = new Demanda(dato.datetime, dato.value);
          this.demandas.push(demanda);
          //console.log(dato);
        }

        this._generacionesService.read().subscribe({
          next: data => {
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

            this.crearGraficoCobertura();
          }
        })
      },
      error: error => {
        console.log("Read error: ", error);
      }
    })
  }

  crearGraficoCobertura() {

    let fechas: Array<String> = this.demandas.map(demanda => demanda.fecha);
    let mwGenRenovable: Array<Number> = this.genRenovables.map(generacion => generacion.megavatios);
    let mwGenNoRenovable: Array<Number> = this.genNoRenovables.map(generacion => generacion.megavatios);
    let mwDemanda: Array<Number> = this.demandas.map(demanda => demanda.megavatios);
    this.grafico = new Chart("GraficoCobertura", {
      data: {
        datasets: [{
          type: 'bar',
          label: 'Generación Renovable',
          data: mwGenRenovable
        }, {
          type: 'bar',
          label: 'Generación No Renovable',
          data: mwGenNoRenovable
        }, {
          type: 'line',
          label: 'Demanda',
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

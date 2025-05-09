import { Component, OnInit } from '@angular/core';
import { DemandasService } from '../services/demandas.service';
import { Demanda } from '../models/Demanda';

import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-demanda',
  standalone: false,
  templateUrl: './demanda.component.html',
  styleUrl: './demanda.component.css',
  providers: [DemandasService]
})

export class DemandaComponent implements OnInit {

  public demandas: Array<Demanda> = [];

  public grafico: any;

  constructor( private _demandasServicio: DemandasService) {

  }

  ngOnInit(): void {
    this.read();
  }

  read(): void {
    this._demandasServicio.read().subscribe({
      next: data => {
        console.log("Demanda: ", data);
        for(let dato of data.included[0].attributes.values) {
          let demanda = new Demanda(dato.datetime, dato.value);
          this.demandas.push(demanda);
          //console.log(dato);
        }
        this.crearGrafico();
      },
      error: error => {
        console.log("Read error: ", error);
      }
    })
  }

  crearGrafico() {
    let fechas: Array<String> = this.demandas.map(demanda => demanda.fecha);
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

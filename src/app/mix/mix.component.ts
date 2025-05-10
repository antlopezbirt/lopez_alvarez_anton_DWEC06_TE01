import { Component, OnInit } from '@angular/core';
import { Mix } from '../models/Mix';
import { ReeApiService } from '../services/reeapi.service';

import { Chart } from 'chart.js/auto';


@Component({
  selector: 'app-mix',
  standalone: false,
  templateUrl: './mix.component.html',
  styleUrl: './mix.component.css',
  providers: [ReeApiService]
})

export class MixComponent implements OnInit {

  public cargando: boolean = true;

  public mixes: Array<Mix> = [];
  public totalRenovable: unknown;
  public totalNoRenovable: unknown;

  public fechaIni: Date = new Date();
  public fechaFin: Date = new Date();
  
  public parametrosMix: any;
  public grafico: any;

  constructor( private _reeApiService: ReeApiService ) {
    this.fechaIni.setDate(this.fechaIni.getDate() - 1);
    this.fechaIni.setHours(0,0,0,0);
    this.fechaFin.setDate(this.fechaFin.getDate() - 1);
    this.fechaFin.setHours(23,59,59,999)
    this.parametrosMix = {
      start_date: this.fechaIni.toISOString(),
      end_date: this.fechaFin.toISOString(),
      time_trunc: 'day'
    }
  }

  ngOnInit(): void {
    this.read();
  }
  
  ngAfterViewInit(): void {
    
  }

  read() {
    this._reeApiService.read('mix', this.parametrosMix).subscribe({
      next: data => {
        console.log("Mix: ", data.included[0].attributes.content);
        for(let dato of data.included[0].attributes.content) {

          let mix = new Mix(dato.attributes.values[0].datetime, dato.attributes.title, dato.attributes.total, true, dato.attributes.values[0].percentage);

          if (mix.tipo === "Generación renovable") {
            this.totalRenovable = mix;
          } else {
            this.mixes.push(mix);
          }
          
        }

        for(let dato of data.included[1].attributes.content) {
          let mix = new Mix(dato.attributes.values[0].datetime, dato.attributes.title, dato.attributes.total, false, dato.attributes.values[0].percentage);
          
          if (mix.tipo === "Generación no renovable") {
            this.totalNoRenovable = mix;
          } else {
            this.mixes.push(mix);
          }
        }

        this.crearGrafico();
        this.cargando = false;
      },
      error: error => {
        console.log("Error: ", error);
        this.cargando = false;
      }
    })
  }

  crearGrafico() {
    console.log("Labels: ", this.mixes.map(mix => mix.tipo));
    console.log("MW: ", this.mixes.map(mix => mix.megavatios));

    const data = {
      labels: this.mixes.map(mix => mix.tipo),
      datasets: [{
        label: "MW generados",
        data: this.mixes.map(mix => mix.megavatios),
        hoverOffset: 4
      }]
    };

    this.grafico = new Chart("GraficoMix", {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Mix energético'
          }
        }
      }
    });
  }
}

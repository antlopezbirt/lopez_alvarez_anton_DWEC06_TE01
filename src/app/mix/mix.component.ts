import { Component, OnInit } from '@angular/core';
import { Mix } from '../models/Mix';
import { ReeApiService } from '../services/reeapi.service';

import { Chart } from 'chart.js/auto';


@Component({
  selector: 'app-mix',
  standalone: false,
  templateUrl: './mix.component.html',
  styleUrl: './mix.component.css',
})

export class MixComponent implements OnInit {

  public seccion: string = "mix";
  public cargando: boolean = true;
  public errorApiError: string | null = null;
  public errorApiMessage: string | null = null;

  public mixes: Array<Mix> = [];
  public totales: Array<Mix> = [];

  public fechaIni: Date = new Date();
  public fechaFin: Date = new Date();
  public fechaIniForm: string;
  public fechaFormMax: string = "";
  
  
  public parametrosMix: any;

  public graficoTotal: any = null;
  public graficoMix: any = null;

  constructor( private _reeApiService: ReeApiService ) {
    // Fecha por defecto: ayer. El usuario la puede cambiar.
    this.fechaIni.setDate(this.fechaIni.getDate() - 1);
    this.fechaIniForm = this.fechaIni.toISOString().split('T')[0];
    // Fecha máxima para el formulario: ayer. El usuario no la puede cambiar.
    this.fechaFormMax = this.fechaIniForm;
  }

  ngOnInit(): void {
    this.read();
  }
  
  ngAfterViewInit(): void {

  }

  read() {

    // Al iniciar la lectura se calculan los parámetros para la fecha elegida y se vacían los arrays de datos
    this.totales = [];
    this.mixes = [];
    this.fechaIni = new Date(this.fechaIniForm+'Z');
    this.fechaFin = new Date(this.fechaIniForm+'Z');
    this.fechaIni.setUTCHours(0,0,0,0);
    this.fechaFin.setUTCHours(23,59,59,999);
    this.parametrosMix = {
      start_date: this.fechaIni.toISOString(),
      end_date: this.fechaFin.toISOString(),
      time_trunc: 'day'
    }

    this._reeApiService.read('mix', this.parametrosMix).subscribe({
      next: data => {

        this.totales = [];
        this.mixes = []
        
        
        this.errorApiError = null;

        for(let dato of data.included[0].attributes.content) {

          let mix = new Mix(dato.attributes.values[0].datetime, dato.attributes.title, dato.attributes.total, true, dato.attributes.values[0].percentage);

          if (mix.tipo === "Generación renovable") {
            this.totales.push(mix);
          } else {
            this.mixes.push(mix);
          }
        }

        for(let dato of data.included[1].attributes.content) {
          let mix = new Mix(dato.attributes.values[0].datetime, dato.attributes.title, dato.attributes.total, false, dato.attributes.values[0].percentage);
          
          if (mix.tipo === "Generación no renovable") {
            this.totales.push(mix);
          } else {
            this.mixes.push(mix);
          }
        }

        if(this.graficoTotal != null && this.graficoMix != null) {
          this.graficoTotal.destroy();
          this.graficoMix.destroy();
        }

        this.crearGraficos();
        this.cargando = false;
        
      },
      error: error => {
        //console.log("Error: ", error);
        this.cargando = false;
        
        this.errorApiError = "Error al recibir los datos.";
        this.errorApiMessage = "Se ha producido un error en la fuente de los datos. Es posible que no existan datos para ese periodo o que la fuente esté fuera de servicio.";
      }
    })
  }

  crearGraficos() {
    // console.log("Labels: ", this.mixes.map(mix => mix.tipo));
    // console.log("MW: ", this.mixes.map(mix => mix.megavatios));

    const datosTotales = {
      labels: this.totales.map(mix => mix.tipo),
      datasets: [{
        label: "MW generados",
        data: this.totales.map(mix => mix.megavatios),
        hoverOffset: 4
      }]
    };

    const datosMix = {
      labels: this.mixes.map(mix => mix.tipo),
      datasets: [{
        label: "MW generados",
        data: this.mixes.map(mix => mix.megavatios),
        hoverOffset: 4
      }]
    };

    this.graficoTotal = new Chart("GraficoTotales", {
      type: 'doughnut',
      data: datosTotales,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: {
                size: 14
              }
            }
          },
          title: {
            display: true,
            text: 'Mix: Renovables / No Renovables',
            font: {
              size: 20
            }
          }
        }
      }
    });


    this.graficoMix = new Chart("GraficoMix", {
      type: 'doughnut',
      data: datosMix,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: {
                size: 14
              }
            }
          },
          title: {
            display: true,
            text: 'Mix: todas las fuentes de generación',
            font: {
              size: 20
            }
          }
        }
      }
    });
  }
}

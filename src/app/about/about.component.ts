import { Component, OnInit, OnDestroy } from '@angular/core';
import { Comentario } from '../models/Comentario';
import { ToastsService } from '../services/toasts.service';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements OnInit, OnDestroy {
  public seccion: Comentario["seccion"] = "about";

  constructor(public _toastsService: ToastsService) {}

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this._toastsService.vaciar();
  }
}
